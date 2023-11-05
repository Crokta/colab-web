import useModal from '../../hooks/useModal.ts';
import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  rem,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import classes from './CreateServerModal.module.css';
import { IconUpload, IconX } from '@tabler/icons-react';

export const CreateServerModal = () => {
  const { isOpen, closeModal } = useModal('CreateServer');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => !value.trim() && "Server name can't be empty",
    },
  });

  const handleDropZoneChange: DropzoneProps['onDrop'] = (files) => {
    if (files.length === 0) {
      setImagePreview(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    setFile(files[0]);
    fileReader.readAsDataURL(files[0]);
  };

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Create a new server">
      <Text>
        Give your server personality a name and an image. You can change this
        later in settings.
      </Text>
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack spacing="md">
          <Flex justify="center" align="center">
            {!imagePreview && (
              <Dropzone
                className={classes.dropzone}
                mt="md"
                onDrop={(files) => handleDropZoneChange(files)}
                accept={IMAGE_MIME_TYPE}
              >
                <Group style={{ minHeight: rem(100), pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size="3.2rem" stroke={1.5}></IconX>
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Idle>
                  <>
                    <Text size="xl" inline>
                      Drag images here or click to select files.
                    </Text>
                    <Text size="xm" c="dimmed" inline mt={7}>
                      Upload a server icon
                    </Text>
                  </>
                </Group>
              </Dropzone>
            )}
            {imagePreview && (
              <Flex pos="relative" w={rem(150)} h={rem(150)} mt="md">
                <>
                  <Button
                    onClick={() => setImagePreview(null)}
                    color="red"
                    pos="absolute"
                    style={{
                      zIndex: 1,
                      borderRadius: '50%',
                      padding: 0,
                      height: rem(30),
                      width: rem(30),
                      top: 0,
                      right: 18,
                    }}
                  >
                    <IconX color="white" />
                  </Button>
                  <Image
                    src={imagePreview}
                    w={rem(150)}
                    h={rem(150)}
                    radius="50%"
                    pos="absolute"
                  />
                </>
              </Flex>
            )}
          </Flex>
          <TextInput
            label="Server Name"
            placeholder="Enter server name"
            {...form.getInputProps('name')}
            error={form.errors.name}
          />
          <Button
            w="30%"
            type="submit"
            variant="gradient"
            mt="md"
            disabled={!!form.errors.name}
          >
            Create Server
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateServerModal;
