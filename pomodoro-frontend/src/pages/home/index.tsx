import { Container } from '../../components/container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../tampletes/maintampletes';
import { useEffect } from 'react';

export function Home() {
    useEffect(() => {
        document.title = 'Chronos Pomodoro';
    }, []);

    return (
        <MainTemplate>
            <Container>
                <CountDown />
            </Container>

            <Container>
                <MainForm />
            </Container>
        </MainTemplate>
    );
}
