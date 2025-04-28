import React from 'react';
import { Box, Container, Heading, Text, Stack, Badge } from '@chakra-ui/react';
import { serviceSideProps } from '@/web/common/i18n/utils';

const TestPage = () => {
  return (
    <Container maxW="container.lg" py="10">
      <Box borderRadius="xl" overflow="hidden" boxShadow="lg" border="1px" borderColor="gray.200">
        <Box bg="blue.500" p="4">
          <Heading size="lg" color="white">
            测试路由页面
          </Heading>
        </Box>

        <Box p="6">
          <Stack gap="5" alignItems="stretch">
            <Box>
              <Heading size="md" mb="2">
                欢迎来到测试路由页面
              </Heading>
              <Text>这是一个使用 Chakra UI v3 美化的示例页面</Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb="2">
                当前路由:
              </Text>
              <Badge colorScheme="blue" p="2" borderRadius="md" fontSize="md">
                /testroute
              </Badge>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export async function getServerSideProps(content: any) {
  return {
    props: {
      ...(await serviceSideProps(content))
    }
  };
}

export default TestPage;
