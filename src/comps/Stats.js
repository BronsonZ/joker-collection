import useDb from "../hooks/useDb";
import useFilter from "../hooks/useFilter";
import { Container, Table } from "react-bootstrap"

const Stats = () => {
    const { posts: allJokers, loading: loadingAll } = useDb("");
    const { filtered: popJokers} = useFilter(allJokers, "pop");
    const { filtered: fJokers} = useFilter(allJokers, "figurine");
    const { filtered: keychainJokers} = useFilter(allJokers, "keychain");
    const { filtered: afJokers} = useFilter(allJokers, "actionFigure");
    const { filtered: otherJokers} = useFilter(allJokers, "other");
    const numberOfJokers = allJokers.length;
    const numberOfAf = afJokers.length;
    const numberOfPops = popJokers.length;
    const numberOfFigurines = fJokers.length;
    const numberOfKeychains = keychainJokers.length;
    const numberOfOther = otherJokers.length;
    let totalCost = 0;
    let afCost = 0;
    let popCost = 0;
    let fCost = 0;
    let otherCost = 0;
    let keychainCost = 0;

    for(let i = 0; i<numberOfJokers; ++i){
        totalCost+=allJokers[i].price;
    }
    for(let i = 0; i<numberOfPops; ++i){
        popCost+=popJokers[i].price;
    }
    for(let i = 0; i<numberOfAf; ++i){
        afCost+=afJokers[i].price;
    }
    for(let i = 0; i<numberOfFigurines; ++i){
        fCost+=fJokers[i].price;
    }
    for(let i = 0; i<numberOfKeychains; ++i){
        keychainCost+=keychainJokers[i].price;
    }
    for(let i = 0; i<numberOfOther; ++i){
        otherCost+=otherJokers[i].price;
    }
    return (
        <Container className="mt-3 text-center text-wrap">
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
                        <td>Pops</td>
                        <td>{!loadingAll && numberOfPops}</td>
                        <td>${popCost}</td>
                        <td>${!loadingAll && popCost>0 ? Math.round(popCost/numberOfPops) : 0}</td>
                    </tr>
                    <tr>
                        <td>Figurines</td>
                        <td>{!loadingAll && numberOfFigurines}</td>
                        <td>${fCost}</td>
                        <td>${!loadingAll && fCost>0 ? Math.round(fCost/numberOfFigurines) : 0}</td>
                    </tr>
                    <tr>
                        <td>Action Figures</td>
                        <td>{!loadingAll && numberOfAf}</td>
                        <td>${afCost}</td>
                        <td>${!loadingAll && afCost>0 ? Math.round(afCost/numberOfAf) : 0}</td>
                    </tr>
                    <tr>
                        <td>Keychains</td>
                        <td>{!loadingAll && numberOfKeychains}</td>
                        <td>${keychainCost}</td>
                        <td>${!loadingAll && keychainCost>0 ? Math.round(keychainCost/numberOfKeychains) : 0}</td>
                    </tr>
                    <tr>
                        <td>Other</td>
                        <td>{!loadingAll && numberOfOther}</td>
                        <td>${otherCost}</td>
                        <td>${!loadingAll && otherCost>0 ? Math.round(otherCost/numberOfOther) : 0}</td>
                    </tr>
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>{!loadingAll && numberOfJokers}</td>
                        <td>${totalCost}</td>
                        <td>${!loadingAll && totalCost>0 ? Math.round(totalCost/numberOfJokers) : 0}</td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
    )
}

export default Stats;