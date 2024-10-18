import React, {useRef, useState} from 'react';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const FormFiles: React.FC<Props> = ({onChange, name}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState('');

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }

        onChange(e);
    };

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className="mb-3">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={filename}
                    placeholder="Выберите файл"
                    readOnly
                    onClick={activateInput}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={activateInput}>
                    Загрузить файл
                </button>
            </div>
            <input
                type="file"
                name={name}
                ref={inputRef}
                onChange={onFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default FormFiles;