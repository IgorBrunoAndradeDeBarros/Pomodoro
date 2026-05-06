import { Container } from '../../components/container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/heading';
import { RouterLink } from '../../components/RouterLink';
import { MainTemplate } from '../../tampletes/maintampletes';
import { useEffect } from 'react';

export function AboutPomodoro() {
    useEffect(() => {
        document.title = 'Entenda a Técnica Pomodoro - Chronos Pomodoro';
    }, []);

    return (
        <MainTemplate>
            <Container>
                <GenericHtml>
                    <Heading>A Técnica Pomodoro 🍅</Heading>

                    <p>
                        A Técnica Pomodoro é uma metodologia de produtividade criada por{' '}
                        <strong>Francesco Cirillo</strong>, que consiste em dividir o
                        trabalho em blocos de tempo intercalados com pausas.
                    </p>

                    <h2>Como funciona o Pomodoro tradicional?</h2>

                    <ul>
                        <li>
                            <strong>1. Defina uma tarefa</strong> que você deseja realizar.
                        </li>
                        <li>
                            <strong>2. Trabalhe nela por 25 minutos</strong> sem interrupções.
                        </li>
                        <li>
                            <strong>3. Faça uma pausa curta de 5 minutos</strong>.
                        </li>
                        <li>
                            <strong>4. A cada 4 ciclos, faça uma pausa longa</strong>.
                        </li>
                    </ul>

                    <h2>
                        Mas no <strong>Chronos Pomodoro</strong> tem um diferencial 🚀
                    </h2>

                    <p>
                        Nosso app segue o conceito original, mas com melhorias para deixar o
                        processo mais eficiente.
                    </p>

                    <p>
                        Você pode configurar o tempo de foco, descanso curto e descanso
                        longo acessando a{' '}
                        <RouterLink href='/settings/'>página de configurações</RouterLink>.
                    </p>

                    <p>
                        Todas as suas tarefas e ciclos concluídos ficam salvos no{' '}
                        <RouterLink href='/history/'>histórico</RouterLink>.
                    </p>

                    <p>
                        <strong>Pronto pra focar?</strong>{' '}
                        <RouterLink href='/'>Voltar para a página inicial</RouterLink>.
                    </p>
                </GenericHtml>
            </Container>
        </MainTemplate>
    );
}
