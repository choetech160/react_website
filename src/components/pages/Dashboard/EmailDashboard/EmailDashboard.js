import React, {useEffect, useState, useRef} from 'react';
import '../../../HomeSection.css';
// Table formating
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { SemipolarLoading } from 'react-loadingg';
// Table formating end
import { useToasts } from 'react-toast-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Auth} from 'aws-amplify';
import { Button } from '../../../Button';
import { Form, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {MdContentCopy} from 'react-icons/md'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import {lang_dict} from './data.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import UsernameDialog from './Dialogs/UsernameDialog';
import DNSDialog from './Dialogs/DNSDialog';
import Tooltip from '@material-ui/core/Tooltip';

const axios = require('axios');

const columns = [
    { id: 'alias', label: 'Alias', minWidth: 170 },
    { id: 'created', label: 'Created\u00a0date', minWidth: 100 },
    {
      id: 'last used',
      label: 'Last time used',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'BW',
      label: `Bandwidth(Mb) \n [last month | last 30 days | total]`,
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'option',
      label: 'Block/Unblock',
      minWidth: 170,
      align: 'right',
    //   format: (value) => value.toFixed(2),
    },
  ];

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
});
function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
  
    return true;
  }
  
  function isObject(object) {
    return object != null && typeof object === 'object';
  }

function EmailDashboard(props, {
    lightBg, 
    topLine, 
    lightText, 
    lightTextDesc, 
    headline, 
    description, 
    buttonLabel, 
    img, 
    alt, 
    imgStart}) {
        const { addToast } = useToasts();
        const supported_language = ['EN', 'FR'];
        let main_address_presentation = lang_dict['EN']['main_address_presentation']
        let main_address_presentation_end = lang_dict['EN']['main_address_presentation_end']
        let modify_username_title = lang_dict['EN']['modify_username_title']
        let add_username_label = lang_dict['EN']['add_username_label']
        let link_email_addr_label = lang_dict['EN']['link_email_addr_label']
        let add = lang_dict['EN']['add']
        let link_to = lang_dict['EN']['link_to']
        let del = lang_dict['EN']['del']
        let add_custom_dns_title  = lang_dict['EN']['add_custom_dns_title']
        let forwarding_to = lang_dict['EN']['forwarding_to']
        let add_custom_dns_label = lang_dict['EN']['add_custom_dns_label']
        let link_username_label = lang_dict['EN']['link_username_label']
        let link_username_placeholder = lang_dict['EN']['link_username_placeholder']
        let link_email_addr_label2 = lang_dict['EN']['link_email_addr_label2']
        let max_allowed_by_subscription = lang_dict['EN']['max_allowed_by_subscription']
        let anon_reply_label = lang_dict['EN']['anon_reply_label']

        if (supported_language.includes(props.lang)){
            main_address_presentation = lang_dict[props.lang]['main_address_presentation']
            main_address_presentation_end = lang_dict[props.lang]['main_address_presentation_end']
            modify_username_title = lang_dict[props.lang]['modify_username_title']
            add_username_label = lang_dict[props.lang]['add_username_label']
            link_email_addr_label = lang_dict[props.lang]['link_email_addr_label']
            add = lang_dict[props.lang]['add']
            link_to = lang_dict[props.lang]['link_to']
            del = lang_dict[props.lang]['del']
            add_custom_dns_title  = lang_dict[props.lang]['add_custom_dns_title']
            forwarding_to = lang_dict[props.lang]['forwarding_to']
            add_custom_dns_label = lang_dict[props.lang]['add_custom_dns_label']
            link_username_label = lang_dict[props.lang]['link_username_label']
            link_username_placeholder = lang_dict[props.lang]['link_username_placeholder']
            link_email_addr_label2 = lang_dict[props.lang]['link_email_addr_label2']
            max_allowed_by_subscription = lang_dict[props.lang]['max_allowed_by_subscription']
            anon_reply_label = lang_dict[props.lang]['anon_reply_label']
        }

        const [showTable, setShowTable] = useState(false);

        const showTableFunc = () => {
            if(window.innerWidth <= 960) {
                setShowTable(false); // if user on mobile => show just part of the table
            } else {
                setShowTable(true); // else (computer/ipad etc) show full table
            }
        }
        useEffect(() => {
            showTableFunc();
        }, []);
        window.addEventListener('resize', showTableFunc)

        const HtmlTooltip = withStyles((theme) => ({
            tooltip: {
              backgroundColor: '#f5f5f9',
              color: 'rgba(0, 0, 0, 0.87)',
              maxWidth: 220,
              fontSize: theme.typography.pxToRem(12),
              border: '1px solid #dadde9',
            },
          }))(Tooltip);

        const classes = useStyles();
        const [aliasTable, setAliasTable] = useState([]);
        const [usersField, setUsersField] = useState(
            {'username': [
                {'value': 'none', 'associated_username': 'none'},
            ], 
            'dns': [
                {'value': 'none', 'associated_username': 'none'}]}
        )
        const [anonReplyDict,setAnonReplyDict] = useState({
            'totalAnonReply':0, 'currentAnonReply':0
        })
        const [inProgressItem, setInProgressItem] = useState(false);

        console.log("inProgress value : ", inProgressItem);
        const handleUsersFieldAction = (field, item, action) => {
            console.log(field, " --> ",action, ' on item: ', item);
            const newArray = usersField;
            console.log(usersField)
            let onceFlag = false
            setInProgressItem(item);

            Object.entries(usersField).map(([key, value]) => {
                if (field === key){
                    Object.entries(value).map(([innerKey, innerValue])=> {
                        console.log("Checks ",innerValue," vs ", item);
                        let fVal = item.value;
                        console.log("fVal : ",fVal);
                        let option = item.associated_email == 'undefined' ? item['associated_username'] : item['associated_email'];
                        console.log(option)
                        console.log("flag value: ", onceFlag)
                        if (action === 'Delete' && !onceFlag){
                            if (innerValue.value === 'none' && action === 'Delete'){//pass
                                console.log("This is none :",innerValue)
                                console.log('PASSING')
                            }
                            else if (deepEqual(innerValue, item)){
                                setInProgressItem(item)
                                onceFlag = true;
                                console.log("Found values as equal!")
                                console.log(item)
                                if (field === 'username' && action === 'Delete'){
                                    console.log("just in if:", usersField)
                                    newArray[field][innerKey]['value'] = 'none';
                                    newArray[field][innerKey]['associated_email'] = 'none';
                                    console.log(usersField)

                                    Auth.currentAuthenticatedUser().then((user) => {
                                        let config = {
                                            headers: {'Content-Type': 'application/json',
                                                    'Authorization': user.signInUserSession.idToken.jwtToken
                                            }
                                        }
                                        let params = {
                                            'field': field,
                                            'action': action,
                                            'item': {'value':fVal, 'associated_email':option}
                                        }
                                        
                                        axios.put('', params, config)
                                        .then((response) => {
                                            console.log("API response [handleUsersFieldAction]: ",response);
                                            if(response.data.body.Success != undefined){
                                                addToast(response.data.body.Success, { appearance: 'success', autoDismiss: true });
                                            }
                                            else if(response.data.body.Error){
                                                addToast(response.data.body.Error, { appearance: 'error', autoDismiss: true });
                                            }
                                            setInProgressItem(false);
                                            setUsersField(newArray);
                                            // getFullUsernameDNSQty();
                                            
                                        })
                                        .catch((error) => {
                                            console.log("API error",error);
                                            addToast(error, { appearance: 'error', autoDismiss: true });
                                        })
                                    })
    
                                }
                                else if (field === 'dns' && action === 'Delete'){
                                    setInProgressItem(item)
                                    newArray[field][innerKey]['value'] = 'none';
                                    newArray[field][innerKey]['associated_username'] = 'none';
                                    Auth.currentAuthenticatedUser().then((user) => {
                                        let config = {
                                            headers: {'Content-Type': 'application/json',
                                                    'Authorization': user.signInUserSession.idToken.jwtToken
                                            }
                                        }
                                        let params = {
                                            'field': field,
                                            'action': action,
                                            'item': {'value':fVal, 'associated_username':option}
                                        }
                                        
                                        axios.put('', params,config)
                                        .then((response) => {
                                            console.log("API response [handleUsersFieldAction]: ",response);
                                            if(response.data.body.Success != undefined){
                                                addToast(response.data.body.Success, { appearance: 'success', autoDismiss: true });
                                            }
                                            else if(response.data.body.Error != undefined){
                                                addToast(response.data.body.Error, {appearance: 'error', autoDismiss: true})
                                            }
                                            setUsersField(newArray);
                                            setInProgressItem(false);
                                            // getFullUsernameDNSQty();
                                        })
                                        .catch((error) => {
                                            console.log("API error",error);
                                            addToast(error, { appearance: 'error', autoDismiss: true });
                                        })
                                    })
                                }
                                else{
                                    console.log('ERROR, field unrecognized');
                                    addToast('Field not recognised, try again', { appearance: 'error', autoDismiss: true });
                                }
                            }
                        }
                    })
                }
            })
        }
                        
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };
        const [paramMaxQty, setParamMaxQty] = useState({dns:0,username:0, currentDnsQty:0,currentUsernameQty:0}); // max qty of username & dns

        useEffect(() => {
            getFullUsernameDNSQty();
        }, [usersField])
        const getFullUsernameDNSQty = () => {
            // This function calculate how many items in username list and dns list are used and return the qty
            // Thoe goal with this number is to compare it with the maximum qty allowed, so the 'add' button can be disabled 
            // and to prevent users from adding more field than they are allowed too.
            console.log("getFullUsernameDNSQty");
            console.log("getFullUsernameDNSQty received array : ", usersField);
            const usernameMaxLen = Object.keys(usersField.username).length;
            const dnsMaxLen = Object.keys(usersField.dns).length;
            let usernameFullQty = 0;
            let dnsFullQty = 0;
            console.log("Max length are (dns : ", dnsMaxLen," and (username) : ", usernameMaxLen);
            Object.entries(usersField).map(([key, value]) => {
                if (key === 'dns'){
                    Object.entries(value).map(([innerKey, innerValue])=> {
                        // console.log("MY ITEM: ", myitem)
                        if(innerValue.value !== 'none'){
                            dnsFullQty++;
                        }
                    });
                }
                else if (key === 'username'){
                    Object.entries(value).map(([innerKey, innerValue])=> {
                        // console.log("MY ITEM: ", myitem)
                        if(innerValue.value !== 'none'){
                            usernameFullQty++;
                        }
                    })
                }
            });
            setParamMaxQty(paramMaxQty => ({...paramMaxQty, dns:dnsMaxLen, username:usernameMaxLen, currentDnsQty: dnsFullQty, currentUsernameQty: usernameFullQty}));
            console.log("Max user param hook : ", paramMaxQty);


        }
        const [currentUser, setCurrentUser]=useState(null);
        useEffect(()=>{
            // Retrieve current username and dns list 
            Auth.currentAuthenticatedUser().then((user) => {
                console.log("User: ", user)
                setCurrentUser(user.username);
                const token = user.signInUserSession.idToken.jwtToken;
                console.log(token)
                let config = {
                    headers: {'Content-Type': 'application/json',
                    'Authorization': token
                    },
                }

                axios.get('', config)
                .then((response) => {
                    console.log("API response: ",response);
                    console.log(response.data);
                    if (response.data.errorMessage != undefined) {
                        addToast(response.data.errorMessage, { appearance: 'error', autoDismiss: true, autoDismissTimeout:'6000' });
                    }
                    else if (response.data.body.Success != undefined){
                        let tempDNSandUsername = {}
                        let tempAnonReplyDict = {}
                        Object.entries(response.data.body.Success).map(([key, value]) => {
                            console.log(`Value of dict: ${key} and ${value}`)
                            if (key === 'username' || key === 'dns'){
                                tempDNSandUsername[key] = value
                            }
                            else{
                                tempAnonReplyDict[key] = value
                            }
                        })
                        setUsersField(tempDNSandUsername);
                        setAnonReplyDict(tempAnonReplyDict)
                    }
                    else if (response.data.body.Warning != undefined){
                        console.log("WARNING");
                    }
                    else if(response.data.body.Error != undefined){
                        console.log("ERROR");
                    }                    
                })
                .catch((error) => {
                    console.log("API error",error);
                })
            })
        },[]);

        useEffect(()=>{
            Auth.currentAuthenticatedUser().then((user) => {
                const token = user.signInUserSession.idToken.jwtToken;
                console.log(token)
                let config = {
                    headers: {'Content-Type': 'application/json',
                    'Authorization': token
                    },
                }
                axios.get('', config)
                .then((response) => {
                    console.log("API getAliases response: ",response);
                    console.log(response.data);
                    if (response.data.errorMessage != undefined) {
                        addToast(response.data.errorMessage, { appearance: 'error', autoDismiss: true, autoDismissTimeout:'6000' });
                    }else{
                        setAliasTable(response.data);
                    }
                })
                .catch((error) => {
                    console.log("APIemail-alias/alias [get] error",error);
                    console.log(error.message)
                })
            })
        },[]);


    const ToggleAliasStatus = (props) => {
        console.log("Toggling the alias button!")
        console.log(props)
        // setSelected(!selected);
        Object.entries(aliasTable).map(([key, value]) => {
            console.log(aliasTable[key].SK," vs ", props.SK);
            if (aliasTable[key].SK === props.SK){
                let newArr = [...aliasTable];
                console.log("Old aray: ", newArr);

                // newArr[key].option = aliasTable[key].option ? false:true;
                newArr[key].option = !aliasTable[key].option;
                console.log("New array values: ", newArr);
                // here call the lambda function to modify the block/unblock
                setAliasTable(newArr);
                Auth.currentAuthenticatedUser().then((user) => { 
                    const token = user.signInUserSession.idToken.jwtToken;
                    let config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    }
                    let params = {
                        'Action': newArr[key].option,
                        'Owner': props.owner,
                        'SK': props.SK,
                        'AliasName': props.alias
                    }
                    axios.post('', params, config)
                    .then((response) => {
                        console.log("email-alias/alias: ",response);
                        if(response.data.body.Success){
                            addToast(response.data.body.Success, { appearance: 'success', autoDismiss: true, autoDismissTimeout:'6000' });
                        }
                        else if (response.data.body.Warning){
                            addToast(response.data.body.Warning, { appearance: 'warning', autoDismiss: true, autoDismissTimeout:'6000' });
                        }
                        else{
                            addToast(response.data.body.Error, { appearance: 'error', autoDismiss: true, autoDismissTimeout:'6000' });
                        }

                    })
                    .catch((error) => {
                        addToast(error, { appearance: 'error', autoDismiss: true });
                        console.log(error);
                    })
            })
        
        }})
    }

    const handleSubmit = () => {
        console.log('form submitted')
    }
    const [searchField, setSearchField] = useState(false)
    const handleSearchField = (props) => {
        console.log(props);
        if (props === ''){
            setSearchField(false);
        }
        else{
            setSearchField(props);
        }
    }

    const onCopy = () => {
        addToast(`@${currentUser}${main_address_presentation_end}`, { appearance: 'success', autoDismiss: true });
    };


    const [openUsernameDialog, setOpenUsernameDialog] = useState(false);
    const [openDNSDialog, setOpenDNSDialog] = useState(false);

    
    const addChangeHandler = (event) => {
        console.log("CreateChannelChangeHandler : ", event);
        setOpenUsernameDialog(event);
        setOpenDNSDialog(event);
    }

    const addElement_TriggerDialog = (item) => {
        if (item === 'username'){
            setOpenUsernameDialog(true);
        }else {
            setOpenDNSDialog(true);
        }
    };

    return (
        <>
        <div className={!lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
        >
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="row home__hero-row"
                            style={{display: 'flex', alignContent:'center'}}
                            >
                            <CopyToClipboard onCopy={onCopy} text={`@${currentUser}${main_address_presentation_end}`}>
                                {/* {(() => sub('test', 'other'))} */}
                            <h2 style={{color:'black', textAlign:'center'}}>{main_address_presentation}{currentUser}{main_address_presentation_end}<MdContentCopy size={14}/>
                            </h2>
                            </CopyToClipboard>
                        </div>
                        <br />
                        <div className="row home__hero-row"
                            style={{display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}}
                            >
                            <TextField 
                                id="standard-search" 
                                label="Search aliases" 
                                type="search" 
                                onChange={e => handleSearchField(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon name='search' />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="col" style={{color:'black'}}>

                          <div className="row">
                            <div className="col" style={{color:'black'}}>
                                <h2>Total bandwidth: </h2>
                            </div>
                            <div className="col" style={{color:'black', position:'absolute', right:0}}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Last 30 days</TableCell>
                                            <TableCell>Last month</TableCell>
                                            <TableCell>Total</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>30 Mb</TableCell>
                                                <TableCell>3Mb</TableCell>
                                                <TableCell>33 Mb</TableCell>
                                            </TableRow>
                                        </TableBody>
                                </Table>
                            </div>
                          </div>
                    </div>


                    {/* <Input icon placeholder='Search...' onChange={e => handleSearchField(e.target.value)}>
                    <input />
                    <Icon name='search' />
                    </Input> */}

                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {showTable ? (
                                    columns.map((column) => (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        >
                                        {column.label}
                                        </TableCell>
                                    ))
                                ):(
                                    columns.map((column) => {
                                        if(column.id === 'alias' || column.id === 'option'){
                                            return(
                                                <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                                >
                                                {column.label}
                                                </TableCell>
                                            )
                                        }
                                    })
                                )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {aliasTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return(
                                    <TableRow hover role="checkbox" tabIndex={-1} key={aliasTable.code}>
                                            {columns.map((column) => {
                                            
                                                let value = row[column.id];
                                                let first_value_item = row['alias'];
                                                console.warn("column values : ", value, "  ", column)
                                                if (first_value_item.startsWith(searchField) || !searchField){
                                                    // display
                                                    if (typeof value == "undefined") {
                                                        return(
                                                        <SemipolarLoading color='#fcba03'/>
                                                        )
                                                    }
                                                    if (column.id === 'BW' && showTable) {
                                                        value = `${value.lastMonth} | ${value.last30days} | ${value.allTime}`
                                                    //   value = JSON.stringify(value)  
                                                    }
                                                    if (column.id === 'BW' && !showTable){
                                                        return null
                                                    }
                                                    if (column.id === 'option'){
                                                        if (row[column.id] === true){ // if option is true : 
                                                            value = (
                                                                <>
                                                                <ToggleButton
                                                                    value="check"
                                                                    // selected={selected}
                                                                    style={{ color: 'red' }}
                                                                    onClick={() => {
                                                                        ToggleAliasStatus(row);
                                                                    }}
                                                                >
                                                                <BlockIcon />
                                                                </ToggleButton>
                                                                <p>blocked</p>
                                                                </>
                                                            )
                                                        }
                                                        else{ // if option is set to false
                                                            value = (
                                                                <>
                                                                <ToggleButton
                                                                    value="uncheck"
                                                                    // selected={selected}
                                                                    style={{ color: 'green' }}
                                                                    onClick={() => {
                                                                        ToggleAliasStatus(row);
                                                                    }}
                                                                >
                                                                <CheckIcon />
                                                                </ToggleButton>
                                                                <p>Passing</p>
                                                                </>
                                                            )
                                                        }
                                                    }

                                                    if (column.id === 'created' && !showTable){
                                                        return null
                                                    }
                                                    if (column.id === 'last used' && !showTable){
                                                        return null
                                                    }
                                                    
                                                    console.log("TableCell : ", column.id, " = ", value)
                                                    return(
                                                        <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    )
                                                }
                                            })}
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={aliasTable.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>


        {/* <div style={{display:'inline-block', width:'100%', height:'100%',border:'2px dashed red', margin: 20, padding:10}}>
            <Grid container alignItems="center" xs={12}>
            <InputLabel id="demo-simple-select-outlined-label">''Is test channel | FOR TEST PURPOSES ONLY''</InputLabel>
            <Checkbox
              checked={isTestChannel}
              onChange={setTestChannel}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              label='Is test channel | FOR TEST PURPOSES ONLY'
            />
            </Grid>
            </div> */}



        <div className="container">
            <div className="row home__hero-row"
                style={{display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}} style={{display:'inline-block', width:'100%', height:'100%',border:'10px solid #1c2237', margin: 20, padding:10}}
            >
                <div className="home__hero-text-wrapper">
                    <div className={false ? 'heading' : 'heading dark'} style={{fontSize:'1.5em'}}>{anonReplyDict['currentAnonReply']}/{anonReplyDict['totalAnonReply']} {anon_reply_label}
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row home__hero-row"
                style={{display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}}
            >
                <div className="col">
                    <div className="home__hero-text-wrapper">
                        <div className={false ? 'heading' : 'heading dark'} style={{fontSize:'2.5em'}}>{modify_username_title}</div>
                        <p className={lightTextDesc ? 'home__hero-subtitle' : 'home__hero-subtitle dark'}>{max_allowed_by_subscription}{paramMaxQty.username}</p>
                        {paramMaxQty.currentUsernameQty < paramMaxQty.username ? (
                            <Button onClick={() => addElement_TriggerDialog('username')} buttonColor='green'><AddIcon />{add}</Button>
                        ):(
                            <HtmlTooltip
                            title={
                                <React.Fragment>
                                <Typography color="inherit">Maximum username reached</Typography>
                                {"You reached your max allowed username quantity of "} <b>{paramMaxQty.username}</b>
                                <em>{"You can upgrade your subscription or contact support for more"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                </React.Fragment>
                            }
                            placement="bottom-start"
                            arrow
                            >
                                <Button onClick={() => addElement_TriggerDialog('username')} buttonStatus='disabled' buttonColor='green'><AddIcon />{add}</Button>
                            </HtmlTooltip>
                        )}
                        <Form color='white' onSubmit={handleSubmit}>
                        {usersField.username.map((item, index) => {
                            return(
                                <>
                                {item.value !== 'none' && (
                                    <>
                                    <p style={{display:'inline-block', color:'black', fontSize:'1em', margin:'1em', padding:'0.25em 1em', border: '1px solid red', borderRadius: '6px'}}>{item.value}
                                        {/* {link_to} {item.associated_email} */}
                                        <br /><br />
                                    {inProgressItem.id === item.id ? (
                                        <Button onClick={() => handleUsersFieldAction('username', item, 'Delete')} buttonColor='red'><CircularProgress /></Button>
                                        ):(

                                        <Button onClick={() => handleUsersFieldAction('username', item, 'Delete')} buttonColor='red'>{del}</Button>
                                        )}
                                        </p>
                                    </>
                                )}
                                </>
                            )
                        })}
                        </Form>
                    </div>
                </div>
                <div className="col">
                    <div className="home__hero-text-wrapper">
                        <div className={false ? 'heading' : 'heading dark'} style={{fontSize:'2.5em'}}>{add_custom_dns_title}</div>
                        <p className={lightTextDesc ? 'home__hero-subtitle' : 'home__hero-subtitle dark'}>{max_allowed_by_subscription}{paramMaxQty.dns}</p>
                        {paramMaxQty.currentDnsQty < paramMaxQty.dns ? (
                            <Button onClick={() => addElement_TriggerDialog('dns')} buttonColor='green'><AddIcon />{add}</Button>
                        ):(
                            <HtmlTooltip
                            title={
                                <React.Fragment>
                                <Typography color="inherit">Maximum DNS quantity reached</Typography>
                                {"You reached your max allowed DNS quantity of "} <b>{paramMaxQty.dns}</b>
                                <em>{"You can upgrade your subscription or contact support for more"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                </React.Fragment>
                            }
                            placement="bottom-start"
                            arrow
                            >
                                <Button onClick={() => addElement_TriggerDialog('dns')} buttonStatus='disabled' buttonColor='green'><AddIcon />{add}</Button>
                            </HtmlTooltip>
                        )}
                        <Form onSubmit={handleSubmit}>
                            {usersField.dns.map((item, index) => {
                                return(
                                    <>
                                    {item.value !== 'none' && (
                                        // is item analyzed? if true display
                                        // del bytton w\ circular else
                                        // below:
                                        <>
                                        <p style={{display:'inline-block', color:'black', fontSize:'1em', margin:'1em', padding:'0.25em 1em', border: '1px solid red', borderRadius: '6px', alignContent:'center'}}>{item.value}
                                        
                                        {/* {forwarding_to}{item.associated_username} */}
                                        <br /><br />
                                        {inProgressItem.id === item.id ? (
                                            <Button onClick={() => handleUsersFieldAction('dns', item, 'Delete')} buttonColor='green'><CircularProgress /></Button>
                                        ):(
                                        <Button onClick={() => handleUsersFieldAction('dns', item, 'Delete')} buttonColor='red'>{del}</Button>
                                        )}
                                        </p>
                                        </>
                                    )
                                }
                                    </>
                                )
                            })}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        <UsernameDialog change={addChangeHandler} status={openUsernameDialog} usersField={usersField} add_username_label={add_username_label} link_email_addr_label={link_email_addr_label}/>
        <DNSDialog change={addChangeHandler} status={openDNSDialog} usersField={usersField} add_custom_dns_label={add_custom_dns_label} link_username_label={link_username_label} link_email_addr_label={link_email_addr_label} link_username_placeholder={link_username_placeholder}/>
        </>
    )
}
export default EmailDashboard