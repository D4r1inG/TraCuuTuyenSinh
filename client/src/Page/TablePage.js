import React, { Children, useEffect, useState } from 'react'
import { Button, message, Upload, Space, Table, Tag, Popconfirm, Modal, Input } from 'antd';
import axios from 'axios';

export default function TablePage() {

    const [defaultList, setdefaultList] = useState()
    const [list, setList] = useState()
    const [searchValue, setSearchValue] = useState({
        hoVaTen: '',
        maHocSinh: ''
    })

    const [visible, setVisible] = useState({
        user: {},
        flag: false,
        isLoading: false
    });

    useEffect(() => {
        axios.get('/api/getStudentList')
            .then(res => {
                setList(res.data.data)
                setdefaultList(res.data.data)
            })
            .catch(err => console.log(err.response.data))
    }, [])

    const handleOk = () => {
        setVisible({ ...visible, isLoading: true });
        axios.post('/api/updateUser', visible.user)
            .then(res => {
                let newList = defaultList.map(user => user.maHocSinh === visible.user.maHocSinh ? visible.user : user)
                setdefaultList(newList)
                setList(newList)
                setVisible({
                    user: {},
                    flag: false,
                    isLoading: false
                });
                message.success("Cập nhật thành công!")
            })
            .catch(err => {
                setVisible({
                    user: {},
                    flag: false,
                    isLoading: false
                });
                message.error("Opps!? Something went wrong!")
            })
    };

    const handleModalChange = (e) => {
        const { value, name } = e.target
        setVisible({
            user: { ...visible.user, [name]: value },
            flag: true
        })
    }

    const handleSearchChange = (e) => {
        const { value, name } = e.target
        setSearchValue({ ...searchValue, [name]: value })
    }

    const handleSearch = () => {
        const { hoVaTen, maHocSinh } = searchValue
        let MHStemp = maHocSinh.trim().replace(" ", "")
        let HVTtemp = removeAccents(hoVaTen).toLowerCase().trim()
        let HVTsearchList = []
        let MHSseacrhList = []

        if (maHocSinh !== '') {
            for (let student of defaultList) {
                let str = student['maHocSinh'].replace(/\r?\n/g, "")
                if (str.includes(MHStemp)) {
                    MHSseacrhList.push(student)
                }
            }
            setList(MHSseacrhList)
        } else if (hoVaTen !== '') {
            for (let student of defaultList) {
                let str = removeAccents(student['hoVaTen']).toLowerCase()
                if (str.search(HVTtemp) !== -1) {
                    HVTsearchList.push(student)
                }
            }
            setList(HVTsearchList)
        } else {
            setList(defaultList)
        }
    }

    const removeAccents = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        },
        {
            title: 'Trường tiểu học',
            dataIndex: 'truongTieuHoc',
            key: 'truongTieuHoc',
        },
        {
            title: 'Quận/Huyện',
            dataIndex: 'quanHuyen',
            key: 'quanHuyen',
        },
        {
            title: 'Mã học sinh',
            dataIndex: 'maHocSinh',
            key: 'maHocSinh',
        },
        {
            title: 'Lớp',
            dataIndex: 'lop',
            key: 'lop',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'hoVaTen',
            key: 'hoVaTen',
        },

        {
            title: 'Ngày sinh',
            children: [
                {
                    title: 'Ngày ',
                    dataIndex: 'ngay',
                    key: 'ngay',
                },
                {
                    title: 'Tháng ',
                    dataIndex: 'thang',
                    key: 'thang',
                },
                {
                    title: 'Năm ',
                    dataIndex: 'nam',
                    key: 'nam',
                },
            ]
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
        },
        {
            title: 'Nơi sinh',
            dataIndex: 'noiSinh',
            key: 'noiSinh',
        },
        {
            title: 'Dân tộc',
            dataIndex: 'danToc',
            key: 'danToc',
        },
        {
            title: 'Hộ khẩu thường trú ',
            dataIndex: 'hoKhau',
            key: 'hoKhau',
        },
        {
            title: 'Điện thoại liên hệ ',
            dataIndex: 'dienThoai',
            key: 'dienThoai',
        },
        {
            title: 'Điểm sơ tuyển vòng 1',
            children: [
                {
                    title: 'Tổng điểm năm lớp 1',
                    dataIndex: 'diem1',
                    key: 'diem1',
                    width: '5%'
                },
                {
                    title: 'Tổng điểm năm lớp 2',
                    dataIndex: 'diem2',
                    key: 'diem2',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm năm lớp 3',
                    dataIndex: 'diem3',
                    key: 'diem3',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm năm lớp 4',
                    dataIndex: 'diem4',
                    key: 'diem4',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm năm lớp 5',
                    dataIndex: 'diem5',
                    key: 'diem5',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm kết quả 5 năm',
                    dataIndex: 'tongDiem',
                    key: 'tongDiem',
                    width: '6%'

                },
                {
                    title: 'Điểm ưu tiên',
                    dataIndex: 'diemUuTien',
                    key: 'diemUuTien',
                    width: '4%'

                },
                {
                    title: 'Tổng điểm sơ tuyển',
                    dataIndex: 'tongDiemSoTuyen',
                    key: 'tongDiemSoTuyen',
                    width: '5%',
                    render: (_, record) => {
                        let color = record.tongDiemSoTuyen > 200 ? 'green' : 'volcano'
                        return <>
                            <Tag color={color}>
                                {record.tongDiemSoTuyen}
                            </Tag>
                        </>
                    },
                },
            ]
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghiChu',
            key: 'ghiChu',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return <Space size="middle">
                    <Popconfirm
                        title={`Xác nhận xóa ${record.hoVaTen} khỏi danh sách ?`}
                        onConfirm={() => {
                            const { maHocSinh } = record
                            axios.post('/api/deleteUser', { maHocSinh: maHocSinh })
                                .then(res => {
                                    message.success(`Đã xóa thành công học sinh ${record.hoVaTen} khỏi danh sách!`);
                                    let newList = defaultList.filter(student => student.maHocSinh !== maHocSinh)
                                    setList(newList)
                                    setdefaultList(newList)

                                    // axios.get('/api/getStudentList')
                                    //     .then(res => {
                                    //         setList(res.data.data)
                                    //         setdefaultList(res.data.data)
                                    //     })
                                    //     .catch(err => console.log(err.response.data))
                                })
                                .catch(err => {
                                    message.error(`Oops! Something went wrong. Please try again!`);
                                    console.log(err.response.data)
                                })
                        }}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <button href="#" className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 '>Delete</button>
                    </Popconfirm>
                    <button className='py-1.5 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ' onClick={() => {
                        setVisible({
                            user: record,
                            flag: true,
                            isLoading: false
                        })
                    }}>Edit</button>
                </Space>
            },
        },
    ];

    return (
        <div className='bg-no-repeat bg-cover bg-center pt-5 border rounded border-gray-300 m-5	' style={{ backgroundImage: 'url(./bg.jpg)' }} >
            <div className='mb-5 w-1/3 mx-auto'>
                <label className="block">
                    <span className="  block text-sm font-medium text-slate-700">
                        Họ và tên
                    </span>
                    <input onChange={handleSearchChange} name='hoVaTen' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tìm theo họ và tên" />
                </label>
                <div className='mt-4'>
                    <label className="block">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700">
                            Mã học sinh
                        </span>
                        <span className=" text-xs font-medium text-red-500">
                            (Ưu tiên tìm theo mã học sinh)
                        </span>
                        <input onChange={handleSearchChange} name='maHocSinh' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tìm theo mã học sinh" />
                    </label>
                </div>
                <div className='flex justify-center mt-3'>
                    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2  mr-5" onClick={() => handleSearch()}>Tìm kiếm</button>
                    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 " onClick={() => {
                        setList(defaultList)
                    }}>Clear table</button>
                </div>
            </div>
            <Table
                className='mx-5'
                columns={columns}
                rowKey={"stt"}
                dataSource={list}
                size="small" bordered
                scroll={{ x: '200vw' }}
                pagination={{
                    pageSize: 10,
                }}
            />

            <Modal
                title={`Chỉnh sửa thông tin học sinh ${visible.user.hoVaTen}`}
                visible={visible.flag}
                onOk={handleOk}
                confirmLoading={visible.isLoading}
                onCancel={() => {
                    setVisible({
                        user: {},
                        flag: false,
                        isLoading: false
                    })
                }}>
                <div className='mb-3'>
                    <label>Mã học sinh: </label>
                    <Input name='maHocSinh' disabled value={visible.user.maHocSinh} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Trường tiểu học: </label>
                    <Input name='truongTieuHoc' value={visible.user.truongTieuHoc} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Quận/Huyện: </label>
                    <Input name='quanHuyen' value={visible.user.quanHuyen} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Lớp: </label>
                    <Input name='lop' value={visible.user.lop} onChange={handleModalChange} />
                </div>
                <div className='mb-3 d-flex'>
                    <div className='mr-3'>
                        <label>Ngày sinh: </label>
                        <Input name='ngay' value={visible.user.ngay} onChange={handleModalChange} />
                    </div>
                    <div className='mr-3'>
                        <label>Tháng sinh: </label>
                        <Input name='thang' value={visible.user.thang} onChange={handleModalChange} />
                    </div>
                    <div>
                        <label>Năm sinh: </label>
                        <Input name='nam' value={visible.user.nam} onChange={handleModalChange} />
                    </div>
                </div>
                <div className='mb-3'>
                    <label>Dân tộc: </label>
                    <Input name='danToc' value={visible.user.danToc} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Hộ khẩu thường trú: </label>
                    <Input name='hoKhau' value={visible.user.hoKhau} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Điện thoại liên hệ: </label>
                    <Input name='dienThoai' value={visible.user.dienThoai} onChange={handleModalChange} />
                </div>
            </Modal>
        </div>
    )
}
