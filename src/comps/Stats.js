import React from "react";
import useDb from "../hooks/useDb";
import { Container } from "react-bootstrap"

const Stats = () => {
    const { posts: allJokers, loading: loadingAll } = useDb("");
    const { posts: popJokers, loading: loadingPops } = useDb("pop");
    const { posts: afJokers, loading: loadingAf } = useDb("actionFigure");
    const numberOfJokers = allJokers.length;
    const numberOfAf = afJokers.length;
    const numberOfPops = popJokers.length;
    let totalCost = 0;
    let afCost = 0;
    let popCost = 0;

    for(let i = 0; i<numberOfJokers; ++i){
        totalCost+=allJokers[i].price;
    }
    for(let i = 0; i<numberOfPops; ++i){
        popCost+=popJokers[i].price;
    }
    for(let i = 0; i<numberOfAf; ++i){
        afCost+=afJokers[i].price;
    }
    return (
        <Container className="mt-3 text-center text-wrap">
            <h2>Total number of Jokers: {!loadingAll && numberOfJokers}</h2>
            <h2>Total number of Pops: {!loadingPops && numberOfPops}</h2>
            <h2>Total number of Action Figures: {!loadingAf && numberOfAf}</h2>
            <h2>Total cost: ${totalCost && totalCost}</h2>
            <h2>Total pops cost: ${popCost && popCost}</h2>
            <h2>Total action figures cost: ${afCost && afCost}</h2>
        </Container>
    )
}

export default Stats;