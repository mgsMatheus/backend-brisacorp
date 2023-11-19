import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CrudDataSource } from "@brisacorp/common/base/data";
import { Hospital } from "../entities/hospitals.entity";
import { Doctor } from "../entities/doctors.entity";
import { DoctorDto } from "@brisacorp/common/dtos/hospitals/doctor.dto";

@Injectable()
export class HospitalsDataSource extends CrudDataSource<Hospital> {
  constructor(
    @InjectModel(Hospital.name)
    private readonly hospitalModel: Model<Hospital>,
  ) {
    super(hospitalModel);
  }

  public async createDoctor(
    hospitalId: string,
    doctor: Doctor,
  ): Promise<Doctor> {
    const updateDoctor = await this.hospitalModel
      .findByIdAndUpdate(
        hospitalId,
        {
          $push: { doctors: doctor },
        },
        { new: true },
      )
      .exec();
    return updateDoctor.doctors.find((item) => item.name === doctor.name);
  }

  public async getDoctors(
    hospitalId: string,
    doctor: string,
    specialty: string,
  ): Promise<DoctorDto[]> {
    const ObjectId = new mongoose.Types.ObjectId(hospitalId);
    if (doctor !== "" && specialty === "") {
      return await this.getDoctorFilterName(ObjectId, doctor);
    }

    if (doctor === "" && specialty !== "") {
      return await this.getDoctorFilterSpecialty(ObjectId, specialty);
    }

    if (doctor !== "" && specialty !== "") {
      return await this.getDoctorFilterSpecialtyAndName(
        ObjectId,
        doctor,
        specialty,
      );
    }
    return await this.getDoctorAll(ObjectId);
  }

  async getDoctorAll(id) {
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  async getDoctorFilterName(id, doctor) {
    const regex = new RegExp(`^${doctor}`, "i");
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
        {
          $match: {
            "doctors.name": { $regex: regex },
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  async getDoctorFilterSpecialty(id, specialty) {
    const regex = new RegExp(`^${specialty}`, "i");
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
        {
          $match: {
            "doctors.specialty": { $regex: regex },
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  async getDoctorFilterSpecialtyAndName(id, doctor, specialty) {
    const regex = new RegExp(`^${doctor}`, "i");
    const regexSpecialty = new RegExp(`^${specialty}`, "i");
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
        {
          $match: {
            "doctors.name": { $regex: regex },
            "doctors.specialty": { $regex: regexSpecialty },
          },
        },
      ])
      .exec();
    return getDoctors;
  }
}
