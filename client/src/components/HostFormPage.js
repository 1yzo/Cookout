import React from 'react'
import { connect } from 'react-redux';
import Badge from './Badge';
import LocationSearchInput from './LocationSearchInput';
import TimeSelect from './TimeSelect';

import '../styles/host-form.css';
 
class HostFormPage extends React.Component {
    state = {
        badges: [],
        image: undefined,
        address: '',
        location: undefined,
        price: '', // Convert to Number and cents before saving to db
        occupancy: undefined,
        description: '',
        subImages: [],
        hours: { open: 0, close: 0 }
    }

    handleBadgeClick = (e) => {
        const { badges } = this.state;
        const badge = e.target.id;
        if (!badges.includes(badge)) {
            this.setState((prevState) => ({ badges: [ ...prevState.badges, badge ] }));
        } else {
            this.setState((prevState) => ({ badges: prevState.badges.filter((badgeName) => badgeName !== badge) }));
        }
    }

    handleOpenChange = (e) => {
        const open = Number(e.target.value);
        this.setState((prevState) => ({ hours: { ...prevState.hours, open } }));
    }

    handleCloseChange = (e) => {
        const close = Number(e.target.value);
        this.setState((prevState) => ({ hours: { ...prevState.hours, close } }));
    }
    
    handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState(() => ({ image: reader.result }));
        }
        reader.readAsDataURL(file);
    }

    handleAddressChange = (address) => {
        this.setState(() => ({ address }));
    }
    
    setLocation = (location) => {
        this.setState(() => ({ location }));
    }

    handlePriceChange = (e) => {
        const price = e.target.value;
        if (!price || price.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ price }));
}
    }
    
    handleOccupancyChange = (e) => {
        const occupancy = e.target.value;   
        if (!occupancy || occupancy.match(/^[0-9]*$/)) {
            this.setState(() => ({ occupancy }));
        }
    }

    handleDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    handleSubImagesChange = (e) => {
        const files = e.target.files;
        for (let i of files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const src= reader.result;
                if (!this.state.subImages.includes(src)) {
                    this.setState((prevState) => ({ subImages: [ ...prevState.subImages, src ] }));
                }
            }
            reader.readAsDataURL(i);
        }       
    }

    handleImageDelete = (e) => {
        const src = e.currentTarget.attributes.value.value;
        this.setState((prevState) => ({ subImages: prevState.subImages.filter((image) => image !== src) }));
    }

    handleSubmit = (e) => {
        fetch('/listings', {
            method: 'POST',
            body: JSON.stringify({
                ...this.state,
                host: this.props.userId,
                price: Number(this.state.price) * 100,
                occupancy: Number(this.state.occupancy)
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    render() {
        return (
            <div className="page">
                <h1>Tell us about your place.</h1>
                <div>Check all that apply</div>
                <div className="badges-container">
                    <Badge id="tools" onClick={this.handleBadgeClick} isActive={this.state.badges.includes('tools')}>Tools</Badge>
                    <Badge id="utensils" onClick={this.handleBadgeClick} isActive={this.state.badges.includes('utensils')}>Utensils</Badge>
                    <Badge id="chairs" onClick={this.handleBadgeClick} isActive={this.state.badges.includes('chairs')}>Chairs</Badge>
                    <Badge id="tables" onClick={this.handleBadgeClick} isActive={this.state.badges.includes('tables')}>Tables</Badge>
                    <Badge id="cleanup" onClick={this.handleBadgeClick} isActive={this.state.badges.includes('cleanup')}>Cleanup</Badge>
                    <Badge id="fuel" onClick={this.handleBadgeClick} isActive={this.state.badges.includes('fuel')}>Coal/Gas</Badge>
                </div>
                <div className="hours-container">
                    <span>Open from</span>
                    <TimeSelect onChange={this.handleOpenChange} />
                    <span>to</span>
                    <TimeSelect onChange={this.handleCloseChange} />
                </div>
                <input id="imageInput" type="file" onChange={this.handleImageChange} />
                <label htmlFor="imageInput"><div className="image-container">
                    {!this.state.image && '+'}
                    {this.state.image && <img src={this.state.image} alt="main" />}
                </div></label>
                <div className="address-form">
                    <LocationSearchInput
                        handleAddressChange={this.handleAddressChange}
                        address={this.state.address} 
                        setLocation={this.setLocation}
                    />
                    <input
                        className="host-input"
                        type="text"
                        value={this.state.price}
                        onChange={this.handlePriceChange}
                        placeholder="$"
                    />
                    <input
                        className="host-input"
                        type="text"
                        value={this.state.occupancy}
                        onChange={this.handleOccupancyChange}
                        placeholder="Max Occupancy"
                    />
                </div>

                <textarea value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description" />
                <input id="subImagesInput" type="file" onChange={this.handleSubImagesChange} />
                <div className="sub-images-title">
                    <div>More Images</div>
                    <label htmlFor="subImagesInput" className="sub-images-label">+</label>
                </div>
                <div className="sub-images-container">
                    {this.state.subImages.map((image, i) => (
                        <div style={{ position: 'relative' }} key={image}>
                            <img className="sub-image" src={image} alt="extra" value={i} />
                            <div className="sub-image-delete" onClick={this.handleImageDelete} value={image}>-</div>
                        </div>
                    ))}
                </div>
                <button onClick={this.handleSubmit}>Create</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.user._id
});

export default connect(mapStateToProps)(HostFormPage);