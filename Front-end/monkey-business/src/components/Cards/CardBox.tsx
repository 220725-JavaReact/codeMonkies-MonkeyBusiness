import { ICard } from '../../models/Card';

interface IProps extends ICard {
    counter?:number,
    onButtonClick?():void
}

function CardBox() {
    return <p>CardBox func!</p>
}

export default CardBox;