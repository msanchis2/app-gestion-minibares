const PanelAdministrador = () => {
    return (
        <div className="row gap-20 masonry pos-r">
        <div className="masonry-sizer col-md-6"></div>
        <div className="masonry-item  w-100">
            <div className="row gap-20">
            <div className='col-md-3'>
                <div className="layers bd bgc-white p-20">
                <div className="layer w-100 mB-10">
                    <h6 className="lh-1">Meliá Castilla</h6>
                </div>
                <div className="layer w-100">
                    <div className="peers ai-sb fxw-nw">
                    <div className="peer peer-greed">
                        <span id="sparklinedash"></span>
                    </div>
                    <div className="peer">
                        <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">+10%</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className='col-md-3'>
                <div className="layers bd bgc-white p-20">
                <div className="layer w-100 mB-10">
                    <h6 className="lh-1">Meliá Villaitana</h6>
                </div>
                <div className="layer w-100">
                    <div className="peers ai-sb fxw-nw">
                    <div className="peer peer-greed">
                        <span id="sparklinedash2"></span>
                    </div>
                    <div className="peer">
                        <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-red-50 c-red-500">-7%</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className='col-md-3'>
                <div className="layers bd bgc-white p-20">
                <div className="layer w-100 mB-10">
                    <h6 className="lh-1">NH Sol</h6>
                </div>
                <div className="layer w-100">
                    <div className="peers ai-sb fxw-nw">
                    <div className="peer peer-greed">
                        <span id="sparklinedash3"></span>
                    </div>
                    <div className="peer">
                        <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-purple-50 c-purple-500">~12%</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className='col-md-3'>
                <div className="layers bd bgc-white p-20">
                <div className="layer w-100 mB-10">
                    <h6 className="lh-1">NH Albufera</h6>
                </div>
                <div className="layer w-100">
                    <div className="peers ai-sb fxw-nw">
                    <div className="peer peer-greed">
                        <span id="sparklinedash4"></span>
                    </div>
                    <div className="peer">
                        <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-blue-50 c-blue-500">33%</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="masonry-item col-12">
            <div className="bd bgc-white">
            <div className="peers fxw-nw@lg+ ai-s">
                <div className="peer peer-greed w-70p@lg+ w-100@lg- p-20">
                <div className="layers">
                    <div className="layer w-100 mB-10">
                    <h6 className="lh-1">Hoteles</h6>
                    </div>
                    <div className="layer w-100">
                    <div id="world-map-marker"></div>
                    </div>
                </div>
                </div>
                <div className="peer bdL p-20 w-30p@lg+ w-100p@lg-">
                <div className="layer w-100">
                    <h6 className="lh-1">Almacen </h6>
                </div>
                    <div className="layers">
                    <div className="layer w-100">
                    <div className="layers">
                        <div className="layer w-100">
                        <h5 className="mB-5">100k</h5>
                        <small className="fw-600 c-grey-700">Coca Cola</small>
                        <span className="pull-right c-grey-600 fsz-sm">50%</span>
                        <div className="progress mT-10">
                            <div className="progress-bar bgc-deep-purple-500" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width:"50%"}}> 
                            <span className="visually-hidden">50% Complete</span>
                            </div>
                        </div>
                        </div>
                        <div className="layer w-100 mT-15">
                        <h5 className="mB-5">1M</h5>
                        <small className="fw-600 c-grey-700">Agua</small>
                        <span className="pull-right c-grey-600 fsz-sm">80%</span>
                        <div className="progress mT-10">
                            <div className="progress-bar bgc-green-500" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width:"80%"}}> 
                            <span className="visually-hidden">80% Complete</span>
                            </div>
                        </div>
                        </div>
                        <div className="layer w-100 mT-15">
                        <h5 className="mB-5">450k</h5>
                        <small className="fw-600 c-grey-700">Almendras</small>
                        <span className="pull-right c-grey-600 fsz-sm">40%</span>
                        <div className="progress mT-10">
                            <div className="progress-bar bgc-light-blue-500" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width:"40%"}}> 
                            <span className="visually-hidden">40% Complete</span>
                            </div>
                        </div>
                        </div>
                        <div className="layer w-100 mT-15">
                        <h5 className="mB-5">1B</h5>
                        <small className="fw-600 c-grey-700">Cerveza</small>
                        <span className="pull-right c-grey-600 fsz-sm">90%</span>
                        <div className="progress mT-10">
                            <div className="progress-bar bgc-blue-grey-500" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width:"90%"}}> 
                            <span className="visually-hidden">90% Complete</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="layer w-100">
                        <h6 className="lh-1">Sin Stock </h6>
                    </div>
                    <div className="peers fxw-nw@lg+ jc-sb ta-c ">
                        <div className="peer">
                        <div className="easy-pie-chart" data-size='80' data-percent="75" data-bar-color='#f44336'>
                            <span></span>
                        </div>
                        <h6 className="fsz-sm">Zumos</h6>
                        </div>
                        <div className="peer">
                        <div className="easy-pie-chart" data-size='80' data-percent="50" data-bar-color='#2196f3'>
                            <span></span>
                        </div>
                        <h6 className="fsz-sm">Chocolatina</h6>
                        </div>
                        <div className="peer">
                        <div className="easy-pie-chart" data-size='80' data-percent="90" data-bar-color='#ff9800'>
                            <span></span>
                        </div>
                        <h6 className="fsz-sm">Aceituna</h6>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="masonry-item col-md-6">
            <div className="bd bgc-white">
            <div className="layers">
                <div className="layer w-100 pX-20 pT-20">
                <h6 className="lh-1">Ventas anuales</h6>
                </div>
                <div className="layer w-100 p-20">
                <canvas id="line-chart" height="220"></canvas>
                </div>
                <div className="layer bdT p-20 w-100">
                <div className="peers ai-c jc-c gapX-20">
                    <div className="peer">
                    <span className="fsz-def fw-600 mR-10 c-grey-800">10% <i className="fa fa-level-up c-green-500"></i></span>
                    <small className="c-grey-500 fw-600">APPL</small>
                    </div>
                    <div className="peer fw-600">
                    <span className="fsz-def fw-600 mR-10 c-grey-800">2% <i className="fa fa-level-down c-red-500"></i></span>
                    <small className="c-grey-500 fw-600">Average</small>
                    </div>
                    <div className="peer fw-600">
                    <span className="fsz-def fw-600 mR-10 c-grey-800">15% <i className="fa fa-level-up c-green-500"></i></span>
                    <small className="c-grey-500 fw-600">Sales</small>
                    </div>
                    <div className="peer fw-600">
                    <span className="fsz-def fw-600 mR-10 c-grey-800">8% <i className="fa fa-level-down c-red-500"></i></span>
                    <small className="c-grey-500 fw-600">Profit</small>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        
        <div className="masonry-item col-md-6">
            <div className="bd bgc-white">
            <div className="layers">
                <div className="layer w-100 p-20">
                <h6 className="lh-1">Resumen Ventas </h6>
                </div>
                <div className="layer w-100">
                <div className="bgc-light-blue-500 c-white p-20">
                    <div className="peers ai-c jc-sb gap-40">
                    <div className="peer peer-greed">
                        <h5>November 2022</h5>
                    </div>
                    <div className="peer">
                        <h3 className="text-end">29.319 €</h3>
                    </div>
                    </div>
                </div>
                <div className="table-responsive p-20">
                    <table className="table">
                    <thead>
                        <tr>
                        <th className=" bdwT-0" colSpan="2">Hotel</th>
                        <th className=" bdwT-0">Estado</th>
                        <th className=" bdwT-0">Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="fw-600" colSpan="2">Meliá Castilla</td>
                        <td><span className="badge bgc-red-50 c-red-700 p-10 lh-0 tt-c rounded-pill">Unavailable</span> </td>
                        <td><span className="text-success">1.020 €</span></td>
                        </tr>
                        <tr>
                        <td className="fw-600" colSpan="2">Meliá Villaitana</td>
                        <td><span className="badge bgc-deep-purple-50 c-deep-purple-700 p-10 lh-0 tt-c rounded-pill">New</span></td>
                        <td><span className="text-info">3.040 €</span></td>
                        </tr>
                        <tr>
                        <td className="fw-600" colSpan="2">NH Sol</td>
                        <td><span className="badge bgc-pink-50 c-pink-700 p-10 lh-0 tt-c rounded-pill">New</span></td>
                        <td><span className="text-danger">4.050 €</span></td>
                        </tr>
                        <tr>
                        <td className="fw-600" colSpan="2">NH Albufera</td>
                        <td><span className="badge bgc-green-50 c-green-700 p-10 lh-0 tt-c rounded-pill">Unavailable</span></td>
                        <td><span className="text-success">6.005 €</span></td>
                        </tr>
                        <tr>
                        <td className="fw-600" colSpan="2">Meliá Castilla</td>
                        <td><span className="badge bgc-red-50 c-red-700 p-10 lh-0 tt-c rounded-pill">Unavailable</span> </td>
                        <td><span className="text-success">1.200 €</span></td>
                        </tr>
                        <tr>
                        <td className="fw-600" colSpan="2">Meliá Villaitana</td>
                        <td><span className="badge bgc-deep-purple-50 c-deep-purple-700 p-10 lh-0 tt-c rounded-pill">New</span></td>
                        <td><span className="text-info">3.004 €</span></td>
                        </tr>
                        <tr>
                        <td className="fw-600" colSpan="2">NH Sol</td>
                        <td><span className="badge bgc-pink-50 c-pink-700 p-10 lh-0 tt-c rounded-pill">New</span></td>
                        <td><span className="text-danger">4.500 €</span></td>
                        </tr>
                        <tr>
                        <td className="fw-600" colSpan="2">NH Albufera</td>
                        <td><span className="badge bgc-green-50 c-green-700 p-10 lh-0 tt-c rounded-pill">Unavailable</span></td>
                        <td><span className="text-success">6.500 €</span></td>
                        </tr>                            
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div className="ta-c bdT w-100 p-20">
                <a href="#">Ver todo</a>
            </div>
            </div>
            </div>
        </div>
        
    )
}

export default PanelAdministrador