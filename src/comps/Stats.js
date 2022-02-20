import React from "react";
import useDb from "../hooks/useDb";
import { Container, Table } from "react-bootstrap"

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
            <Table striped size="">
                <thead>
                    <tr>
                        <th></th>
                        <th># of</th>
                        <th>Price</th>
                        <th>Avergae Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pops</td>
                        <td>{!loadingPops && numberOfPops}</td>
                        <td>${popCost}</td>
                        <td>${!loadingPops && Math.round(popCost/numberOfPops)}</td>
                    </tr>
                    <tr>
                        <td>Action Figures</td>
                        <td>{!loadingAf && numberOfAf}</td>
                        <td>${afCost}</td>
                        <td>${!loadingAf && Math.round(afCost/numberOfAf)}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{!loadingAll && numberOfJokers}</td>
                        <td>${totalCost}</td>
                        <td>${!loadingAll && Math.round(totalCost/numberOfJokers)}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default Stats;