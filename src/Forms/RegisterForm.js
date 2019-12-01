import React, { Fragment } from 'react';
import { Section,
        Heading,
        Form
} from 'react-bulma-components';

// import { Field, Label, Input } from 'react-bulma-components/lib/components/form';

const RegisterForm = () => {
 return(
   <Fragment>
       <Section>
           <Heading>
               Register
           </Heading>
           <Form.Field>
                <Form.Label>
                    Last Name
                </Form.Label>
                <input className="input is-primary" type="text" placeholder="Primary input" />
           </Form.Field>
       </Section>
    
   </Fragment>
 )
}

export default Register;