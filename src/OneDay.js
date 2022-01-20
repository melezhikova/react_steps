import PropTypes from "prop-types";

function OneDay (props) {
    console.log(props)
    const { item, delDay } = props;

    return (
        <div className="dayContainer">
            <div className="date">{item.date}</div>
            <div className="distance">{item.distance}</div>
            <div className="del" data-id={item.id} onClick={delDay}></div>
        </div>
    )
}

OneDay.propTypes = {
    date: PropTypes.string,
    distance: PropTypes.string
}

OneDay.defaultProps = {
    date: null,
    distance: null
};

export default OneDay;