import React from 'react';
import { Card, CardTitle, CardText as CardBody, Button } from 'react-md';

class StyleGuide extends React.PureComponent {
  render() {
    const swatchStyles = { width: '15vw', height: '15vw', marginTop: '20px' };

    return (
      <div>
        <Card>
          <CardTitle title="Colors" />
          <CardBody className="container-flex wrap spaced">
            <Card style={swatchStyles} className="background-white">
              <CardTitle title="Photon White" />
            </Card>
            <Card style={swatchStyles} className="background-black">
              <CardTitle title="Dusk Gray" />
            </Card>
            <Card style={swatchStyles} className="background-neutral-10">
              <CardTitle title="Neutral 10" />
            </Card>
            <Card style={swatchStyles} className="background-neutral-20">
              <CardTitle title="Neutral 20" />
            </Card>
            <Card style={swatchStyles} className="background-neutral-30">
              <CardTitle title="Neutral 30" />
            </Card>
            <Card style={swatchStyles} className="background-neutral-40">
              <CardTitle title="Neutral 40" />
            </Card>
            <Card style={swatchStyles} className="background-primary">
              <CardTitle title="Primary" />
            </Card>
            <Card style={swatchStyles} className="background-secondary-light">
              <CardTitle title="Secondary Light" />
            </Card>
            <Card style={swatchStyles} className="background-secondary">
              <CardTitle title="Secondary" />
            </Card>
            <Card style={swatchStyles} className="background-secondary-dark">
              <CardTitle title="Secondary Dark" />
            </Card>
            <Card style={swatchStyles} className="background-error">
              <CardTitle title="Error" />
            </Card>
          </CardBody>
        </Card>
        <br />
        <Card className="md-block-centered">
          <CardTitle title="Typography" />
          <CardBody>
            <h1 className="heading-primary">Heading Primary</h1>
            <h2 className="heading-secondary">Heading Secondary</h2>
            <h3 className="subheading-primary">Subheading Primary</h3>
            <div className="copy-secondary">Copy Primary</div>
            <p className="copy-primary">Copy Primary</p>
            <div className="label-primary">Label Primary</div>
          </CardBody>
        </Card>
        <br />
        <Card className="md-block-centered">
          <CardTitle title="Buttons" />
          <CardBody>
            <div className="container-flex wrap">
              <Button flat primary swapTheming>
                Primary
              </Button>
              <Button flat primary swapTheming disabled>
                Disabled Primary
              </Button>
            </div>
            <div className="container-flex wrap">
              <Button flat secondary swapTheming>
                Secondary
              </Button>
              <Button flat secondary swapTheming disabled>
                Disabled Secondary
              </Button>
            </div>
            <div className="container-flex wrap">
              <Button flat primary className="outlined">
                Primary Outlined
              </Button>
              <Button flat primary className="outlined" disabled>
                Primary Outlined
              </Button>
            </div>
            <div className="container-flex wrap">
              <Button flat secondary className="outlined">
                Secondary Outlined
              </Button>
              <Button flat secondary className="outlined" disabled>
                Disabled Secondary Outlined
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default StyleGuide;
