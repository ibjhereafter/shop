import React, { Fragment } from "react";


const Rating = ({ averageRating }) => {
    const rating = () => {

        if (averageRating === 0.5 || (averageRating > 0.5 && averageRating < 1)) {
            return <i className="half star icon yellow"/>
        }

        if (averageRating === 1 || (averageRating > 1 && averageRating < 1.5)) {
            return (
                <Fragment>
                    <i className="star icon yellow"/>
                    <i className="star icon grey"/>
                    <i className="star icon grey"/>
                    <i className="star icon grey"/>
                    <i className="star icon grey"/>
                </Fragment>
            )
        }

        if (averageRating === 1.5 || (averageRating > 1.5 && averageRating < 2)) {
            return (
                <Fragment>
                    <i className="star icon yellow"/>
                    <i className="half star icon yellow"/>
                    <i className="star icon grey"/>
                    <i className="star icon grey"/>
                    <i className="star icon grey"/>
                </Fragment>
            )
        }

        if (averageRating === 2 || (averageRating > 2 && averageRating < 2.5)) {
            return (
                <Fragment>
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon grey" />
                    <i className="star icon grey" />
                    <i className="star icon grey" />
                </Fragment>
            )
        }

        if (averageRating === 2.5 || (averageRating > 2.5 && averageRating < 3)) {
            return (
                <Fragment>
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="half star icon yellow"/>
                    <i className="star icon grey" />
                    <i className="star icon grey" />

                </Fragment>
            )
        }

        if (averageRating === 3 || (averageRating > 3 && averageRating < 3.5)) {
            return (
                <Fragment>
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon grey" />
                    <i className="star icon grey" />
                </Fragment>
            )
        }

        if (averageRating === 3.5 || (averageRating > 3.5 && averageRating < 4)) {
            return (
                <Fragment>
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="half star icon yellow" />
                    <i className="star icon grey" />
                </Fragment>
            )
        }

        if (averageRating === 4 || (averageRating > 4 && averageRating < 4.5)) {
            return (
                <Fragment>
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon grey" />
                </Fragment>
            )
        }

        if (averageRating === 4.5 || (averageRating > 4.5 && averageRating < 5)) {
            return (
                <Fragment>
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="half star icon yellow" />
                </Fragment>
            )
        }

        if (averageRating === 5) {
            return (
                <Fragment>
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow" />
                    <i className="star icon yellow"/>
                </Fragment>
            )
        }
    };

    return (<div>{rating()}</div>)
}

export default Rating;