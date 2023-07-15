export default function Alert (props) {
    return (
        <div id="Alert" style={props.style}>
            <p>{props.message}</p>
        </div>
    )
}