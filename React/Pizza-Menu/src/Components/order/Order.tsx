import '../footer/footerStyle.css'

type orderProps = {
    closeHour: Number;
    openHour: Number
}

export default function Order({ openHour, closeHour }: orderProps) {
    return (
        <div className="order">
            <p>
                {`We're open from ${openHour}:00 to ${closeHour}:00. Come visit us or order online.`}
            </p>
            <button className="btn">Order</button>
        </div>
    );
}