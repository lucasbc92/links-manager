import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { linkList, setLinkToDelete, linkDelete } from '../../../actions/LinkActions';

import Layout from '../../Layouts/Manage/index';

const Links = ({links, linkList, linkToDelete, setLinkToDelete, linkDelete}) => {

    useEffect(() => {
        linkList();
    }, [linkList])

    //console.log('*** Links.linkToDelete', linkToDelete);

    const cancelDelete = (e) => {
        setLinkToDelete(null);
    }

    const confirmDelete = (e) => {
        if(linkToDelete) linkDelete(linkToDelete);
    }

    console.log('*** Links.links', links);

    return (
        <Layout>
            <div className="row">
                <div className="col">
                    <h1>Links</h1>
                </div>
                <div className="col text-right align-self-bottom pt-2">
                    <Link to="/manage/links/create" className="btn btn-primary">
                        Add
                    </Link>                
                </div>
            </div>
            {links && links.map(link => {

                const deleteLink = (e) => {
                    setLinkToDelete(link);
                }

                const border = (linkToDelete && linkToDelete.id === link.id)
                    ? 'border border-danger rounded'
                    : 'border border-transparent';

                return (
                    <div key={link.id} className={`pb-2 pt-2 pl-3 pr-3 d-flex flex-row justify-content-between ${border}`}>
                        <div className="pr-3">
                            <img src={link.image} alt="Link icon" height="100" width="100"/>
                        </div>
                        <div className="align-self-center">
                            <span className="text-primary clearfix">{link.label}</span>
                            <span className="text-primary clearfix">{link.url}</span>
                        </div>
                        <div className="ml-auto p-2 clearfix">
                            <Link to={`/manage/links/edit/${link.id}`}>Edit</Link>
                            <button className="btn btn-clear" onClick={deleteLink}>Delete</button>
                        </div>
                    </div>
                )
            })}

            {linkToDelete && 
            <div className="alert alert-danger rounded float-center shadow-bold">
                <h4 className="alert-heading">Delete Confirmation!</h4>
                <p>Are you sure you want to delete? This action cannot be undone.</p>
                <hr/>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-light" onClick={cancelDelete}>Cancel</button>
                    <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </div>
            </div>
            }      
            
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        links: state.link.links,
        linkToDelete: state.link.linkToDelete,
    }
}

export default connect(mapStateToProps, {linkList, setLinkToDelete, linkDelete})(Links);