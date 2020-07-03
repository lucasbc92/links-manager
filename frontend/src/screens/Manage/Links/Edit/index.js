import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { linkGet } from '../../../../actions/LinkActions';

import Layout from '../../../Layouts/Manage'
import FormGroup from '../../../../components/FormGroup';
import FormCheck from '../../../../components/FormCheck';

const Edit = ({link, linkGet}) => {
    const { id } = useParams();

    useEffect(() => {
        linkGet(id);
    }, [id, linkGet]) 

    console.log('*** Edit.id', id);
    console.log('*** Edit.link', link);

    return (
        <Layout>
            <h1>Edit Link</h1>
            <div>
                <form>
                    <FormGroup label="Label" name="label" data={link} type="text"/>
                    <FormGroup label="Url" name="url" data={link} type="text"/>
                    <FormCheck label="Is Social" name="isSocial" data={link} />
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

export default connect(mapStateToProps, { linkGet })(Edit);