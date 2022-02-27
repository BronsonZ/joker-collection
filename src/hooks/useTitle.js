import { useEffect } from "react";

export const useTitle = (filter, setTitle) => {
    useEffect(()=>{
        switch(filter){
          case "pop":
            setTitle("Pops")
            break;
          case "actionFigure":
            setTitle("Action  Figures")
            break;
          case "figurine":
            setTitle("Figurines")
            break;
          case "keychain":
            setTitle("Keychains")
            break;
          case "other":
            setTitle("Others")
            break;
          default:
            setTitle("All Jokers")
            break;
        }
      }, [filter, setTitle])
}