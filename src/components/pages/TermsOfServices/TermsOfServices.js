import React from 'react'
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import {data} from './Data';
import { withStyles } from "@material-ui/core/styles";
const CustomTypography = withStyles({
    root: {
      color: "#000000"
    }
  })(Typography);


function TermsOfServices(props) {
    const supported_language = ['EN', 'FR'];
    let data_lang = data['EN'];
    if (supported_language.includes(props.lang)){
        data_lang = data[props.lang]
    }
    return (
        <>
            {/* <Text style={styles.bold}>I'm bold!</Text>
            <Text style={styles.italic}>I'm italic!</Text>
            <Text style={styles.underline}>I'm underlined!</Text> */}

            <div className={true ? 'home__hero-section' : 'home__hero-section darkBg'}
            >
                <div className="container">
                {/* <div className="top-line">{data_lang.title}</div> */}
                <h1 className={false ? 'heading' : 'heading dark'}>{data_lang.title}</h1>
                <CustomTypography variant="body1" gutterBottom>{data_lang.firstLine}</CustomTypography><br />
                <CustomTypography variant="body1" fontWeight="fontWeightBold" m={1}>
                    {data_lang.AccessText}
                </CustomTypography><br />

                <div className="top-line">{data_lang.PrivacyPolicyTitle}</div>
                <CustomTypography variant="body1" gutterBottom>{data_lang.Para1}</CustomTypography>
                <CustomTypography variant="body1" gutterBottom>{data_lang.Para2}</CustomTypography>
                <CustomTypography variant="body1" gutterBottom>{data_lang.Para3}</CustomTypography>
                <CustomTypography variant="body1" gutterBottom>{data_lang.CommitmentTitle}</CustomTypography>
                <ul>
                    {data_lang.CommitmentRows.map((item, index) =>  (
                        <li> key={index}
                            <CustomTypography variant="body1" gutterBottom>{'\u2022'} {item.content}</CustomTypography>
                        </li>
                    ))}
                </ul>
                <br />
                <CustomTypography variant="body1" gutterBottom>{data_lang.Para4}</CustomTypography>
                <CustomTypography variant="body1" gutterBottom>{data_lang.Para5}</CustomTypography><br />
                
                <div className="top-line">{data_lang.WarrantyTitle}</div>


                <CustomTypography variant="overline" display="block" gutterBottom>
                    {data_lang.WarrantyText}
                </CustomTypography>
                </div>
            </div>



        </>
    )
}

export default TermsOfServices
