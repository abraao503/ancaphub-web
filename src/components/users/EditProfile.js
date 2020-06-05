import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import EditIcon from 'react-ionicons/lib/IosCreate';
import CloseIcon from 'react-ionicons/lib/MdClose';
import { updateProfileInfoRequest } from '../../actions/users';
import Input from '../form/Input';

import { IconButton, Button, Dialog, CardBody, CardHeader } from '../ui';

const EditProfile = () => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.user);
  const handleClick = () => setOpen(!open);
  const editFormRef = useRef(null);
  async function handleSubmit(validatedData) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(
            3,
            formatMessage({ id: 'account.settings.validation.nameShort' })
          )
          .max(
            30,
            formatMessage({ id: 'account.settings.validation.nameLong' })
          )
          .required(
            formatMessage({ id: 'account.settings.validation.nameRequired' })
          ),
        bio: Yup.string().max(
          160,
          formatMessage({ id: 'account.settings.validation.maxBioLength' })
        ),
        site: Yup.string().url(
          formatMessage({ id: 'account.settings.validation.invalidURL' })
        ),
        birthday: Yup.date()
          .max(
            new Date(),
            formatMessage({
              id: 'account.settings.validation.invalidBirthDate',
            })
          )
          .notRequired(),
      });

      await schema.validate(validatedData, {
        abortEarly: false,
      });
      dispatch(updateProfileInfoRequest(validatedData));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        editFormRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Button color="primary" size="small" onClick={() => setOpen(true)}>
        <EditIcon />
        <span>
          <FormattedMessage id="components.editProfile.heading" />
        </span>
      </Button>

      <Dialog onClose={handleClick} show={open}>
        <Form
          initialData={{
            name: data.name,
            bio: data.bio || '',
            currentCity: data.currentCity || '',
            site: data.site || '',
            birthday:
              data.birthday && data.birthday !== null
                ? data.birthday.substring(0, 10)
                : undefined,
          }}
          onSubmit={handleSubmit}
          ref={editFormRef}
        >
          <CardHeader
            action={{
              label: <FormattedMessage id="common.edit" />,
              action: () => editFormRef.current.submitForm(),
              show: true,
            }}
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton icon={<CloseIcon />} onClick={handleClick} />
                <FormattedMessage id="components.editProfile.heading" />
              </div>
            }
          />
          <CardBody style={{ maxWidth: 420 }}>
            <FormattedMessage id="common.name">
              {(msg) => <Input placeholder={msg} name="name" />}
            </FormattedMessage>
            <FormattedMessage id="common.bio">
              {(msg) => (
                <Input style={{ marginTop: 16 }} placeholder={msg} name="bio" />
              )}
            </FormattedMessage>
            <FormattedMessage id="nearby.location">
              {(msg) => (
                <Input
                  style={{ marginTop: 16 }}
                  placeholder={msg}
                  name="currentCity"
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="common.website">
              {(msg) => (
                <Input
                  style={{ marginTop: 16 }}
                  placeholder={msg}
                  name="site"
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="common.birthday">
              {(msg) => (
                <Input
                  type="date"
                  style={{ marginTop: 16 }}
                  placeholder={msg}
                  name="birthday"
                />
              )}
            </FormattedMessage>
          </CardBody>
        </Form>
      </Dialog>
    </>
  );
};

export default EditProfile;
