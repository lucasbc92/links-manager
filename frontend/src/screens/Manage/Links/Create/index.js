import React from 'react';

import Layout from '../../../Layouts/Manage'

import { connect } from 'react-redux';
import { getFormData } from '../../../../helpers/form';

import { linkCreate } from '../../../../actions/LinkActions';

const Create = ({link, linkCreate}) => {

    const submitHandler = (e) => {
        e.preventDefault();

        const data = getFormData(e);
        //console.log('*** Create.submitHandler.data', data);

        linkCreate(data);
    }

    //console.log('*** Create.link', link);

    return (
        <Layout>
            <h1>Create Link</h1>
            <div>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Label</label>
                        <input type="text" className="form-control" name="label"/>
                    </div>
                    <div className="form-group">
                        <label>Url</label>
                        <input type="text" className="form-control" name="url"/>
                    </div>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input type="checkbox" name="isSocial"/>
                            <span className="form-check-sign"></span>
                            Is Social
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-round">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>       
    )
}

const mapStateToProps = (state) => {
    return {
        link: state.link.link,
    }
}

export default connect(mapStateToProps, {linkCreate})(Create);