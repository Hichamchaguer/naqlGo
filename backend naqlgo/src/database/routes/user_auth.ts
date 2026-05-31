import router from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../authMiddleware';

const routes = router.Router();

routes.post('/register', async (req: any, res: any) => {

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

        res.send(await user.save());
        console.log(User)
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// login via jwt 

routes.post('/login', async (req: any, res: any) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log('>>>>> User:', user);
        if (!user || !user.password) {
            return res.status(404).send({ error: 'Invalid email or password 1' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log('Invalid password for user:', req.body.email);
            return res.status(400).send({ error: 'Invalid email or password 2' });
        }

        const token = jwt.sign({ id: user._id }, 'secret');
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day

        })
        res.send({
            message: 'Login successful',
            user:{
                role: user.role,
            }
        });
    }
    catch (err) {
        res.status(401).json({ error: 'Unauthenticated' });
    }
});

routes.get('/user', async (req:any, res:any) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.send({ user: 'Unauthenticated1' });
        }
        const decoded: any = jwt.verify(token, 'secret');
        const user = await User.findOne({ _id: decoded.id });
        console.log('>>>>> User:', user);
        if (!user) {
            return res.send({ user: 'Unauthenticated2' });
        }
        res.send(user);
    }
    catch (err) {
        console.error('Error fetching user:', err);
        res.status(404).json({ error: 'Error fetching user' });
    }
});

routes.post('/logout', authMiddleware, (req: any, res: any) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.send({ message: 'Logout successful' });
});

routes.get('/profile' , authMiddleware, async (req: any, res: any) => {

    try {
            const users = await User.find();
            res.send({ message: users });
        }   
        catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
        }
});

routes.put('/user', authMiddleware, async (req: any, res: any) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthenticated' });
        }

        const updates: any = {};
        if (typeof req.body.firstName === 'string') {
            updates.firstName = req.body.firstName.trim();
        }
        if (typeof req.body.lastName === 'string') {
            updates.lastName = req.body.lastName.trim();
        }
        if (typeof req.body.profilePicture === 'string') {
            updates.profilePicture = req.body.profilePicture.trim();
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.send(user);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
    }
});

export default routes;