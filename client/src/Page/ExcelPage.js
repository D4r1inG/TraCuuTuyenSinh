import React, { useEffect, useRef, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Space, Table, Tag } from 'antd';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import axios from 'axios';
import TablePage from './TablePage';
import { Student } from '../model/student_model';

export default function ExcelPage() {

    const [showTable, setShowTable] = useState(false)

    const handleUpload = e => {
        if (e.target.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            message.error(`${e.target.files[0].name} file upload failed. Please insert excel file only!`);
            return
        } else {
            ExcelRenderer(e.target.files[0], (err, resp) => {
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
                        axios.post('/api/insert', student)
                            .then(res => {
                                setShowTable(true)
                            })
                            .catch(err => console.log(err.response.data))
                    } else {
                        continue
                    }
                }
                message.success(`${e.target.files[0].name} file uploaded successfully`);
            });
        }
    }

    return (
        <div className='d-flex flex-column justify-content-between' style={{ height: '100vh' }}>
            <div className='pt-5'>
                <h1 className='text-center'>Tra cứu thông tin tuyển sinh</h1>
                {!showTable ? <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img src={'./Logo-Hoc-Vien-Tai-Chinh-AOF.png'} alt='Logo' className='img-fluid' width={"200px"} />
                    <div className='d-flex justify-content-center mt-5 flex-column align-items-center'>
                        <p className='font-weight-bold' style={{ fontSize: '20px' }}>Vui lòng chèn file excel</p>
                        <input type={"file"} onChange={handleUpload} className="" />
                    </div>
                </div> :
                    <TablePage />
                }
            </div>
            <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <div className='d-flex h-100 align-items-center justify-content-between'>
                    <div className='ml-5 justify-content-center d-flex flex-column my-3'>
                        <img src='./Logo-Hoc-Vien-Tai-Chinh-AOF.png' className='m-auto' width={"60px"} />
                        <p className='text-center m-0'>Học Viện Tài Chính</p>
                    </div>
                    <div className='mr-5' style={{ fontWeight: 'bold' }}>
                        <p className='m-0'>Địa chỉ: Số 58 Lê Văn Hiến, Phường Đức Thắng, Quận Bắc Từ Liêm, Hà Nội</p>
                        <p className='m-0'>Điện thoại: 0243.8389326 | Fax: 0243.8388906</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}