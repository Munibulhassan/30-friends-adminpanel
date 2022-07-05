import { Container, Col, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";


function Advance() {
    return (
        <section className="ad-settings">
            <Container>
                <div className="settings-head">
                    <h3>Advanced Setting</h3>
                    <Link to={"/"}>Back</Link>
                </div>

                {/* Basic info  */}
                <div className="basic-info">
                    <label>Time in Chat Cycle</label>
                    <Col md={6}>
                        <Form.Select >
                            <option>10 minutes</option>
                            <option value="1">20 minutes</option>
                            <option value="2">30 minutes</option>
                            <option value="3">40 minutes</option>
                        </Form.Select>
                    </Col>
                </div>
                {/* Basic info END */}

                {/* Basic info  */}
                <div className="basic-info">
                    <label>Time in Lobby</label>
                    <Col md={6}>
                        <Form.Select >
                            <option>Event Type</option>
                            <option value="1">Public</option>
                            <option value="2">Private</option>
                        </Form.Select>
                    </Col>
                </div>
                {/* Basic info END */}

                {/* Basic info  */}
                <div className="basic-info">
                    <label>Max Participants</label>
                    <Col md={6}>
                        <Form.Select >
                            <option>Event Type</option>
                            <option value="1">Public</option>
                            <option value="2">Private</option>
                        </Form.Select>
                    </Col>
                </div>
                {/* Basic info END */}

                {/* Basic info  */}
                <div className="basic-info">
                    <label>Event End Notification</label>
                    <Col md={6}>
                        <Form.Select >
                            <option>Event Type</option>
                            <option value="1">Public</option>
                            <option value="2">Private</option>
                        </Form.Select>
                    </Col>
                </div>
                {/* Basic info END */}

                {/* Basic info  */}
                <div className="basic-info">
                    <label>IceBreaker</label>
                    <Col md={12}>
                        <div className="to-do">
                        <label>1.</label> <input type="text" />
                        </div>
                        <div className="to-do">
                        <label>2.</label> <input type="text" />
                        </div>
                    </Col>
                </div>
                {/* Basic info END */}
                <div className="setting-btn">
                <Link to={"/Advance_settings"}>Create Lounge</Link>
              </div>
            </Container>
        </section>
    );
}

export default Advance;