import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/footer.css';

export default function Footer(){
    return(
        <div className="container-footer">
            <div className="footer">
                <div className="row">
                    <div className="col-md-12">
                        <p>&copy; 2023 FakeWhatsapp SRL. All rights reserved.</p>
                        <span>Designed by two unhealthy minds: </span><br />
                        <span>Distasi Andrea</span><br />
                        <span>Lorusso Cosimo</span><br />
                    </div>
                </div>
            </div>
        </div>           
    );  
}