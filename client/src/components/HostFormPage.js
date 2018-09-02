import React from 'react'
import Badge from './Badge';
import LocationSearchInput from './LocationSearchInput';

import '../styles/host-form.css';
 
class HostFormPage extends React.Component {
    state = {
        badges: [],
        image: undefined,
        address: '',
        location: undefined,
        price: '',
        occupancy: undefined,
        subImages: []
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
                </div>
            </div>
        );
    }
}

export default HostFormPage;