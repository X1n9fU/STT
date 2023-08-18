import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryThreeQuarters, faWeight } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

export default function Basic_Components_top () {
    return( 
    <div>
        <div style={{ padding:'0px 20px', display:'flex', flexDirection:'row', justifyContent:'space-between', fontSize:"18px"}}>
            <h4>15:30</h4>
            <div style={{ height: "45px", width: "200px", backgroundColor:"black", marginLeft:"40px", paddingTop:"0px", borderBottomLeftRadius:"20px", borderBottomRightRadius:"20px"}}></div>
            <h4 style={{ fontSize:"16px"}}> 
            <FontAwesomeIcon icon={faWifi} /> 5G <b/><b/> 
            <FontAwesomeIcon icon={faBatteryThreeQuarters} size="xl" />
            </h4>
        </div>
    </div>
    )
}