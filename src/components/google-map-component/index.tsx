import React from 'react';

function GoogleMapComponent() {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0584086279077!2d106.77665370986081!3d10.883162189227416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d88f7934c0b5%3A0xcad27afb598c5df2!2zS3R4IEtodSBCIMSQaHFnIC0gQ-G7lW5nIFNhdSBLdHggS2h1IEIgxJBocWcgLSDEkMaw4budbmcgVGnDqnUgQmnhu4N1IFPhu5EgMyAtIFBoxrDhu51uZyBMaW5oIFRydW5n!5e0!3m2!1svi!2s!4v1718851915368!5m2!1svi!2s"
            width="100%"
            height="300" style={{border:0}}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

        </iframe>
    );
}

export interface location {
    lat: number, // Vĩ độ
    lng: number // Kinh độ
}

export default GoogleMapComponent;