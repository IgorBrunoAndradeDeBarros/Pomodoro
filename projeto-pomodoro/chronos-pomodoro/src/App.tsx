import { useState } from 'react'
import { PlayCircleIcon } from 'lucide-react'
import { Container } from './components/Container'
import { CountDown } from './components/CountDown'
import { Cycles } from './components/Cycles'
import { DefaultButton } from './components/DefaultButton'
import { DefaultInput } from './components/DefaultInput'
import { Footer } from './components/Footer'
import { Heading } from './components/Heading'
import { Logo } from './components/Logo'
import { Menu } from './components/Menu'
import './style/theme.css'
import './style/global.css'

export function App() {
    const [numero, setNumero] = useState(0)

    function handleClick() {
        setNumero(prevState => prevState + 1)
    }

    return (
        <>
            <Heading>Número: {numero}</Heading>
            <button onClick={handleClick}>Aumenta</button>

            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            <Container>
                <CountDown />
            </Container>

            <Container>
                <form className="form" action="">
                    <div className="formRow">
                        <DefaultInput
                            labelText={numero.toString()}
                            id="meuInput"
                            type="text"
                            placeholder="Digite algo"
                        />
                    </div>

                    <div className="formRow">
                        <p>Oque você está trabalhando agora?</p>
                    </div>

                    <div className="formRow">
                        <Cycles />
                    </div>

                    <div className="formRow">
                        <DefaultButton icon={<PlayCircleIcon />} />
                    </div>
                </form>
            </Container>

            <Container>
                <Footer />
            </Container>
        </>
    )
}
