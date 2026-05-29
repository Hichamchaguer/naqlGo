declare module 'class-variance-authority' {
  export type VariantProps<T> = Record<string, any>;
  export function cva(base?: string, options?: any): (args?: any) => string;
}
