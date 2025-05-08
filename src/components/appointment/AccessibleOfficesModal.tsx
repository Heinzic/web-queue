import React, { useMemo, useState } from "react";
import { Modal, FlexBox, Title, SearchInput, Button } from "../../ui";
import { Office } from "../../models";
import { OfficesList } from "./OfficesList";
import { motion } from "motion/react";


interface AccessibleOfficesModalProps {
  open: boolean;
  offices: Office[];
  onSelect: (office: Office) => void;
  onClose: () => void;
}

export const AccessibleOfficesModal: React.FC<AccessibleOfficesModalProps> = ({
  open,
  offices,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState("");

  const filteredOffices = useMemo(
    () =>
      offices.filter(
        (office) =>
          (office.name.toLowerCase().includes(search.toLowerCase()) ||
            office.address.toLowerCase().includes(search.toLowerCase()))
      ),
    [offices, search]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.95 }}
        transition={{ duration: 0.5 }}
      >
        <FlexBox direction="column" gap={3} padding={4}>
          <Title size="medium" marginBottom={2}>
            Доступные офисы
          </Title>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск офиса"
            marginBottom={2}
            showIcon
          />
          <div>
            <OfficesList
              offices={filteredOffices}
              onOfficeSelect={onSelect}
            />
          </div>
          <Button variant="outlined" onClick={onClose}>
            Закрыть
          </Button>
        </FlexBox>
      </motion.div>
    </Modal>
  );
};