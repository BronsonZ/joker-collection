import useDb from "../hooks/useDb";
import { Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom";

const Stats = () => {
    const { posts, loading } = useDb(false, "jokers");
    let numberOfJokers = posts.length;
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

    posts.forEach(joker => {
        totalCost+=joker.price;
        switch(joker.category){
            case "actionFigure":
                afCost+=joker.price;
                numberOfAf++;
                break;
            case "pop":
                popCost+=joker.price;
                numberOfPops++;
                break;
            case "figurine":
                fCost+=joker.price;
                numberOfFigurines++;
                break;
            case "keychain":
                keychainCost+=joker.price;
                numberOfKeychains++;
                break;
            case "other":
                otherCost+=joker.price;
                numberOfOther++;
                break;
            default:
                break;
        }
    });

    let popCostPercent = Math.round((popCost/totalCost)*1000)/10;
    let afCostPercent = Math.round((afCost/totalCost)*1000)/10;
    let fCostPercent = Math.round((fCost/totalCost)*1000)/10;
    let keychainCostPercent = Math.round((keychainCost/totalCost)*1000)/10;
    let otherCostPercent = Math.round((otherCost/totalCost)*1000)/10;

    let popCountPercent = Math.round((numberOfPops/numberOfJokers)*1000)/10;
    let afCountPercent = Math.round((numberOfAf/numberOfJokers)*1000)/10;
    let fCountPercent = Math.round((numberOfFigurines/numberOfJokers)*1000)/10;
    let keychainCountPercent = Math.round((numberOfKeychains/numberOfJokers)*1000)/10;
    let otherCountPercent = Math.round((numberOfOther/numberOfJokers)*1000)/10;

    let popAverage = numberOfPops > 0 ? Math.round((popCost/numberOfPops)*10)/10 : 0;
    let afAverage = numberOfAf > 0 ? Math.round((afCost/numberOfAf)*10)/10 : 0;
    let fAverage = numberOfFigurines > 0 ? Math.round((fCost/numberOfFigurines)*10)/10 : 0;
    let keychainAverage = numberOfKeychains > 0 ? Math.round((keychainCost/numberOfKeychains)*10)/10 : 0;
    let otherAverage = numberOfOther > 0 ? Math.round((otherCost/numberOfOther)*10)/10 : 0;
    let totalAverage = numberOfJokers > 0 ? Math.round((totalCost/numberOfJokers)*10)/10 : 0;
    
    return (
        <Container className="mt-3 text-center text-wrap">
            <h1>Stats of all the Jokers</h1>
            {!loading && <Table size="sm" className="text-success" variant="dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Count</th>
                        <th>Percent</th>
                        <th>Cost</th>
                        <th>Cost Percent</th>
                        <th>Avergae Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=pop">Pops</Link></td>
                        <td>{numberOfPops}</td>
                        <td>{popCountPercent}%</td>
                        <td>${popCost}</td>
                        <td>{popCostPercent}%</td>
                        <td>${popAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=figurine">Figurines</Link></td>
                        <td>{numberOfFigurines}</td>
                        <td>{fCountPercent}%</td>
                        <td>${fCost}</td>
                        <td>{fCostPercent}%</td>
                        <td>${fAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=actionFigure">Action Figures</Link></td>
                        <td>{numberOfAf}</td>
                        <td>{afCountPercent}%</td>
                        <td>${afCost}</td>
                        <td>{afCostPercent}%</td>
                        <td>${afAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=keychain">Keychains</Link></td>
                        <td>{numberOfKeychains}</td>
                        <td>{keychainCountPercent}%</td>
                        <td>${keychainCost}</td>
                        <td>{keychainCostPercent}%</td>
                        <td>${keychainAverage}</td>
                    </tr>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=other">Others</Link></td>
                        <td>{numberOfOther}</td>
                        <td>{otherCountPercent}%</td>
                        <td>${otherCost}</td>
                        <td>{otherCostPercent}%</td>
                        <td>${otherAverage}</td>
                    </tr>
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td><Link className="stats-link text-reset" to="/?=">Total</Link></td>
                        <td>{numberOfJokers}</td>
                        <td></td>
                        <td>${totalCost}</td>
                        <td></td>
                        <td>${totalAverage}</td>
                    </tr>
                </tfoot>
            </Table>}
            {loading && <p>Loading...</p>}
        </Container>
    )
}

export default Stats;