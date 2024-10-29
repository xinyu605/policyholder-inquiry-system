import {
  type ChangeEvent,
  type ChangeEventHandler,
  type FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { type SearchFormProps } from '@/app/policyholders/lib/type';

interface PolicyholderSearchFormRes {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

const useSearchForm = ({
  value: initialValue,
  onSearch,
}: SearchFormProps): PolicyholderSearchFormRes => {
  const [value, setValue] = useState(initialValue || '');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSearch(value);
    },
    [onSearch, value]
  );

  useEffect(() => {
    if (initialValue === undefined) return;
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    handleChange,
    handleSubmit,
  };
};

export default useSearchForm;
