import Card from '@/components/Card';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function IndexPage() {
  const [b, setb] = useState(false);
  return (
    <Card label="关于">
      <Modal
        visible={b}
        title="2222"
        onConfirm={() => {
          setb(!b);
        }}
      >
        <p>444444444</p>
      </Modal>
      <button
        onClick={() => {
          setb(!b);
        }}
      >
        333
      </button>
    </Card>
  );
}
