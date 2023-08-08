import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";


function CardExampleCard(props) {
    const {imagePath, header, meta, description} = props
    const navigate = useNavigate();

    return(
        <Card className='card' onClick={()=>{
                console.log(header)
                navigate(`/artist/${header}`,{state:{artist:props.header}})
            }}>
            <Image src={imagePath} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{header}</Card.Header>
            <Card.Meta>
                {meta}
            </Card.Meta>
            <Card.Description>
                {description}
            </Card.Description>
            </Card.Content>
        </Card>
  )
}

export default CardExampleCard