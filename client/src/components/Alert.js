import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const Alert = ({message}) => {
    return (
        <Fragment>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Alert!</strong> {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </Fragment>
    )
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Alert
