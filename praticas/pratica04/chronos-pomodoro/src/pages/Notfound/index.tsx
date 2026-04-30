import { Container } from '../../components/container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/heading';
import { RouterLink } from '../../components/RouterLink';
import { MainTemplate } from '../../tampletes/maintampletes';

export function NotFound() {
    return (
        <MainTemplate>
            <Container>
                <GenericHtml>
                    <Heading>404 - Página não encontrada 🚀</Heading>

                    <p>
                        Opa! Parece que a página que você está tentando acessar não existe.
                        Talvez ela tenha tirado férias, resolvido explorar o universo ou se
                        perdido em algum lugar entre dois buracos negros. 🌌
                    </p>

                    <p>
                        Mas calma, você não está perdido no espaço. Dá pra voltar em
                        segurança para a <RouterLink href='/'>página principal</RouterLink>{' '}
                        ou <RouterLink href='/history/'>para o histórico</RouterLink>.
                    </p>
                </GenericHtml>
            </Container>
        </MainTemplate>
    );
}
