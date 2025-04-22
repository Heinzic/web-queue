import { Container } from '../../../components/shared';
import { Title, CardLink, Text, FlexBox } from '../../../ui';
import { nav } from '../../../pages';

function QueueSelectionPage() {
    return (
        <Container padding={6}>
          <Title 
            size="large" 
            marginBottom={6}
            color="#333"
          >
            Запись на прием
          </Title>
          
          <FlexBox direction="column" gap={4}>
            <CardLink 
              to={`${nav.mfc.index()}?queue=${encodeURIComponent('Для физических лиц')}`}
              size="medium"
              variant="default"
              withArrow
            >
              <Text size="base" weight="medium">Для физических лиц</Text>
            </CardLink>
            
            <CardLink 
              to={`${nav.mfc.index()}?queue=${encodeURIComponent('Для юридических лиц')}`}
              size="medium"
              variant="default"
              withArrow
            >
              <Text size="base" weight="medium">Для юридических лиц и ИП</Text>
            </CardLink>
          </FlexBox>
        </Container>
      );
}

export default QueueSelectionPage;