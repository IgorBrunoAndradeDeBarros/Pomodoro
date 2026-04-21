import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';

type MainTemplateProps = {
    children: React.ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
    return (
        <>
            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            {/* Aqui é onde o conteúdo específico de cada página será injetado */}
            {children}

            <Container>
                <Footer />
            </Container>
        </>
    );
}
