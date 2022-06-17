import React, { useEffect, useRef, useState } from 'react'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { ExcelRenderer } from 'react-excel-renderer';
import axios from 'axios';
import TablePage from './TablePage';
import { Student } from '../model/student_model';
import Dragger from 'antd/lib/upload/Dragger';

export default function ExcelPage() {

    const [showTable, setShowTable] = useState(false)

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },

        onChange(info) {
            if (info.file.status === 'done') {
                if (info.file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    message.error(`${info.file.name} file upload failed. Please insert excel file only!`);
                } else {
                    ExcelRenderer(info.file.originFileObj, (err, resp) => {
                        let newStudentList = []
                        for (let i = resp.rows.length - 1; i > 0; i--) {
                            if (typeof (resp.rows[i][0]) === 'number') {
                                let student = new Student(
                                    resp.rows[i][0],
                                    resp.rows[i][1],
                                    resp.rows[i][2],
                                    resp.rows[i][3],
                                    resp.rows[i][4],
                                    resp.rows[i][5],
                                    resp.rows[i][6],
                                    resp.rows[i][7],
                                    resp.rows[i][8],
                                    resp.rows[i][9],
                                    resp.rows[i][10],
                                    resp.rows[i][11],
                                    resp.rows[i][12],
                                    resp.rows[i][13],
                                    resp.rows[i][14],
                                    resp.rows[i][15],
                                    resp.rows[i][16],
                                    resp.rows[i][17],
                                    resp.rows[i][18],
                                    resp.rows[i][19],
                                    resp.rows[i][20],
                                    resp.rows[i][21],
                                    resp.rows[i][22]
                                )
                                newStudentList.push(student)
                                console.log(newStudentList)
                                axios.post('/api/insert', student)
                                    .then(res => {
                                        setShowTable(true)
                                    })
                                    .catch(err => console.log(err.response.data))
                            } else {
                                continue
                            }
                        }
                        message.success(`${info.file.name} file uploaded successfully`);
                    });

                }
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className='flex flex-col justify-between' style={{ height: '100vh' }}>
            <div className='pt-10'>
                <h1 className='text-center text-2xl'>Tra cứu thông tin tuyển sinh</h1>
                {!showTable ? <div className='flex justify-center items-center flex-col'>
                    <img src={'./Logo-Hoc-Vien-Tai-Chinh-AOF.png'} alt='Logo' width={"200px"} />
                    <div className='flex justify-center mt-5 flex-col items-center'>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text px-10">Bấm hoặc di chuyển file vào đây để chèn</p>
                            <p className="ant-upload-hint">
                                Vui lòng chỉ chèn file excel
                            </p>
                        </Dragger>
                    </div>
                </div> :
                    <TablePage />
                }
            </div>
            <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#" class="hover:underline">Học viện tài chính</a>. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}