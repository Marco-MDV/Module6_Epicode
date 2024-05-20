import React from 'react'
import Alert from 'react-bootstrap/Alert';


export default function ErrorComponent() {
    return (
        <div style={{height: 'calc(100vh - 360px)'}}>
            <Alert variant="danger">
                <Alert.Heading>Element not found</Alert.Heading>
                <p>
                    sorry but we have a problems with found element that you search!
                </p>
                <hr />
                <p className="mb-0">
                    try again or later, thks!
                </p>
            </Alert>
        </div>
    )
}
