import useDb from "../hooks/useDb";
import { Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom";

const Stats = () => {
    const { posts: allJokers, loading: loadingAll } = useDb(false, "jokers");
    let numberOfJokers = allJokers.length;
    let numberOfAf = 0;
    let numberOfPops = 0;
    let numberOfFigurines = 0;
    let numberOfKeychains = 0;
    let numberOfOther = 0;
    let totalCost = 0;
    let afCost = 0;
    let popCost = 0;
    let fCost = 0;
    let otherCost = 0;
    let keychainCost = 0;

    for(let i = 0; i<numberOfJokers; ++i){
        totalCost+=allJokers[i].price;
        switch(allJokers[i].category){
            case "actionFigure":
                afCost+=allJokers[i].price;
                numberOfAf++;
                break;
            case "pop":
                popCost+=allJokers[i].price;
                numberOfPops++;
                break;
            case "figurine":
                fCost+=allJokers[i].price;
                numberOfFigurines++;
                break;
            case "keychain":
                keychainCost+=allJokers[i].price;
                numberOfKeychains++;
                break;
            case "other":
                otherCost+=allJokers[i].price;
                numberOfOther++;
                break;
            default:
                break;
        }
    }

    let popAverage = numberOfPops > 0 ? Math.round(popCost/numberOfPops) : 0;
    let afAverage = numberOfAf > 0 ? Math.round(afCost/numberOfAf) : 0;
    let fAverage = numberOfFigurines > 0 ? Math.round(fCost/numberOfFigurines) : 0;
    let keychainAverage = numberOfKeychains > 0 ? Math.round(keychainCost/numberOfKeychains) : 0;
    let otherAverage = numberOfOther > 0 ? Math.round(otherCost/numberOfOther) : 0;
    let totalAverage = numberOfJokers > 0 ? Math.round(totalCost/numberOfJokers) : 0;
    
    return (
        <Container className="mt-3 text-center text-wrap">
            <h1>Stats of all the Jokers</h1>
            <Table className="text-success" variant="dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Count</th>
                        <th>Cost</th>
                        <th>Avergae Cost</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <td><Link className="stats-link text-reset" to="/?=pop">Pops</Link></td>
                        <td>{!loadingAll && numberOfPops}</td>
                        <td>${popCost}</td>
                        <td>${!loadingAll && popAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=figurine">Figurines</Link></td>
                        <td>{!loadingAll && numberOfFigurines}</td>
                        <td>${fCost}</td>
                        <td>${!loadingAll && fAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=actionFigure">Action Figures</Link></td>
                        <td>{!loadingAll && numberOfAf}</td>
                        <td>${afCost}</td>
                        <td>${!loadingAll && afAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=keychain">Keychains</Link></td>
                        <td>{!loadingAll && numberOfKeychains}</td>
                        <td>${keychainCost}</td>
                        <td>${!loadingAll && keychainAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=other">Others</Link></td>
                        <td>{!loadingAll && numberOfOther}</td>
                        <td>${otherCost}</td>
                        <td>${!loadingAll && otherAverage}</td>
                    </tr>
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=">Total</Link></td>
                        <td>{!loadingAll && numberOfJokers}</td>
                        <td>${totalCost}</td>
                        <td>${!loadingAll && totalAverage}</td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
    )
}

export default Stats;