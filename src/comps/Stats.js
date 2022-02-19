import React from "react";
import useDb from "../hooks/useDb";
import { Container } from "react-bootstrap"

const Stats = () => {
    const { posts: allJokers, loading: loadingAll } = useDb("");
    const { posts: popJokers, loading: loadingPops } = useDb("Bronson");
    const { posts: afJokers, loading: loadingAf } = useDb("Cooper");
    const numberOfJokers = allJokers.length;
    const numberOfAf = afJokers.length;
    const numberOfPops = popJokers.length;
    return (
        <Container className="mt-3 text-center text-wrap">
            <h2>Total number of Jokers: {!loadingAll && numberOfJokers}</h2>
            <h2>Total number of Pops: {!loadingPops && numberOfPops}</h2>
            <h2>Total number of Action Figures: {!loadingAf && numberOfAf}</h2>
        </Container>
    )
}

export default Stats;