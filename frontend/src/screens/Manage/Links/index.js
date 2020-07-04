import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { linkList, setLinkToDelete } from '../../../actions/LinkActions';

import Layout from '../../Layouts/Manage/index';

const Links = ({links, linkList, linkToDelete, setLinkToDelete}) => {

    useEffect(() => {
        linkList();
    }, [linkList])

    //console.log('*** Links.linkToDelete', linkToDelete);

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
            {links && links.length && links.map(link => {

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
            
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        links: state.link.links,
        linkToDelete: state.link.linkToDelete,
    }
}

export default connect(mapStateToProps, {linkList, setLinkToDelete})(Links);