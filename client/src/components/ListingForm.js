import React from 'react'
import { connect } from 'react-redux';
import Badge from './Badge';
import LocationSearchInput from './LocationSearchInput';
import TimeSelect from './TimeSelect';

import '../styles/host-form.css';
 
class ListingForm extends React.Component {
    state = {
        badges: this.props.listing ? this.props.listing.badges : [],
        image: undefined,
        imageTag: this.props.listing ? this.props.listing.image : undefined,
        address: this.props.listing ? this.props.listing.address : '',
        location: this.props.listing ? this.props.listing.location : {},
        price: this.props.listing ? (this.props.listing.price / 100).toString() : '',
        occupancy: this.props.listing ? this.props.listing.occupancy.toString() : undefined,
        description: this.props.listing ? this.props.listing.description : '',
        subImages: [],
        hours: this.props.listing ? this.props.listing.hours : { open: 0, close: 0 },
        error: '',
        s3ObjectKeysToDelete: []
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
            this.setState(() => ({ image: file, imageTag: reader.result }));
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
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (!this.state.subImages.map(({ tag }) => tag).includes(result)) {
                this.setState((prevState) => ({
                    subImages: [...prevState.subImages, { file, tag: result, fromS3: false }]
                }));
            }
        }
        if (this.state.subImages.length < 10) {
            reader.readAsDataURL(file);
        }
    }

    handleImageDelete = (e) => {
        const tagToDelete = e.currentTarget.attributes.value.value;
        this.setState((prevState) => ({ subImages: prevState.subImages.filter(({ tag }) => tag !== tagToDelete) }));
        if (this.props.listing) {
            const subImage = this.state.subImages.find(({ tag }) => tag === tagToDelete);
            if (subImage.fromS3) {
                const url = subImage.tag.split('/');
                const s3ObjectKey = url[url.length - 1];
                this.setState((prevState) => ({ s3ObjectKeysToDelete: [...prevState.s3ObjectKeysToDelete, s3ObjectKey] }));
            }
        }
    }

    handleSubmit = (e) => {
        if (this.state.image && this.state.address && this.state.price && this.state.occupancy) {
            const formData = new FormData();
            formData.append('host', this.props.userId);
            formData.append('badges', JSON.stringify(this.state.badges));
            formData.append('image', this.state.image);
            formData.append('address', this.state.address);
            formData.append('location', JSON.stringify(this.state.location));
            formData.append('price', Number(this.state.price) * 100);
            formData.append('occupancy', Number(this.state.occupancy));
            formData.append('description', this.state.description);
            formData.append('hours', JSON.stringify(this.state.hours));
            this.props.listing && formData.append('s3ObjectKeysToDelete', JSON.stringify(this.state.s3ObjectKeysToDelete));
            for (let i of this.state.subImages) {
                formData.append('subImages[]', i.file);
            }
            console.log('submitting');
            this.props.handleSubmit(formData)
                .then(() => { console.log('success') })
                .catch(err => { console.log(err) } );
        } else {
            this.setState(() => ({ error: 'A required field is missing' }));
        }
    }
    
    componentDidMount() {
        const { listing } = this.props;
        if (listing) {
            fetch(listing.image)
                .then(res => res.blob())
                .then(res => { this.setState(() => ({ image: res })) })
                .catch(err => { console.log(err) });
            if (listing.subImages.length > 0) {
                for (let imageUrl of listing.subImages) {
                    fetch(imageUrl)
                        .then(res => res.blob())
                        .then(res => { this.setState((prevState) => ({ subImages: [...prevState.subImages, { file: res, tag: imageUrl, fromS3: true }] })) })
                        .catch(err => { console.log(err) });
                }
            }
        }
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
                    {!this.state.imageTag && '+'}
                    {this.state.imageTag && <img src={this.state.imageTag} alt=" " />}
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
                    {this.state.subImages.map(({ tag }) => (
                        <div style={{ position: 'relative' }} key={tag}>
                            <img className="sub-image" src={tag} alt="extra" />
                            <div className="sub-image-delete" onClick={this.handleImageDelete} value={tag}>-</div>
                        </div>
                    ))}
                </div>
                {this.state.error && <div>{this.state.error}</div>}
                <button onClick={this.handleSubmit}>{this.props.listing ? 'Save' : 'Create'}</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.user._id
});

export default connect(mapStateToProps)(ListingForm);