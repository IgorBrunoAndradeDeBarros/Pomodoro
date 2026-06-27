import { Link } from 'react-router';

type RouterLinkProps = {
    children: React.ReactNode;
    href: string;
} & Omit<React.ComponentProps<'a'>, 'href'>;

export function RouterLink({ children, href, ...props }: RouterLinkProps) {
    return (
        <Link to={href} {...props}>
            {children}
        </Link>
    );
}
