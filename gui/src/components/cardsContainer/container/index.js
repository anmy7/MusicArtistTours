import React, {useEffect, useState} from 'react'
import {Cards} from './../components'
import './../assets/styles.less'
import axios from 'axios'

function CardsContainer(props) {
    const { searchValue } = props;
    const [cards, setCards] = useState([])
    const [data, setData] = useState([])

    useEffect(()=>{
        fetchData();
    },[])

    useEffect(()=>{
        const dataFiltered = data.filter(element=> element.ARTIST.toLowerCase().includes(searchValue))
        displayCards(dataFiltered)
    },[searchValue])

    const fetchData = () => {
        axios.get("/api/getTop100Djs").then(results=>{
            const data = _.get(results, "data", {})
            console.log(data)
            setData(data)
            displayCards(data)
        })
    }

    const displayCards = (dataList) => {
        var cardsList = []
        var rows = []
        for (let index = 0; index < dataList.length; index++) {
            const card = (<Cards 
                key={dataList[index].ARTIST}
                imagePath={dataList[index].IMAGEPATH}
                header={dataList[index].ARTIST}
                meta={"DJMag Position: #"+dataList[index].DJMAGTOP}
                description={"Tour dates: "+dataList[index].TOURS}
            />)
            rows.push(card)
            if((rows.length===5 && index !== 0) || index===dataList.length-1){
                cardsList.push(<div className='row' key={"row"+rows.length}>{rows}</div>)
                rows = []
            }

        }
        setCards(cardsList)
    }

    return (
        <div className='cards__container'>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"></link>
            {cards}
        </div>
    )
}

export default CardsContainer;