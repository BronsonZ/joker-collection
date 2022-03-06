import { Container } from "react-bootstrap"

const About = () => {
    return (
        <Container className="mt-3 text-center" style={{fontSize: "1.2em"}}>
            <h1>About</h1>
            <p>This is a website for Mindi to keep track of and display her entire Joker collection.</p>
            <a className="text-reset" href="https://github.com/BronsonZ/joker-collection">Source</a>
        </Container>
    )
}

export default About;