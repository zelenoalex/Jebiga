import NextLink from "next/link";

type LinkInterface = {
  href: string;
  className?: string
  children: React.ReactNode;
}

const Link = ({ href, children, className }: LinkInterface) => {
  return (
    <NextLink
      className={`${className} font-semibold hover:underline text-accent-foreground`}
      href={href}
    >
      {children}
    </NextLink>
  );
};

export default Link;
