declare module "class-variance-authority" {
  export type VariantProps<T> = T extends unknown
    ? Record<string, string | undefined>
    : never;
  export function cva(
    base?: string,
    options?: Record<string, unknown>,
  ): (args?: Record<string, string | undefined>) => string;
}
